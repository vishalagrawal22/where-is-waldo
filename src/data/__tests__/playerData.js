import {
  addDoc,
  doc,
  collection,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  computeScore,
  saveStartTime,
  savePlayerName,
  getPlayerDoc,
  deletePending,
} from "../playerData";

function setup() {
  const gameId = "game1";
  const playerId = "player1";
  const pendingDocId = "pending1";
  const name = "Haunted Knight";
  return { gameId, playerId, pendingDocId, name };
}

jest.mock("../../firebase-config", () => {
  return {
    db: "database",
  };
});

jest.mock("firebase/firestore", () => {
  return {
    collection: jest.fn((...querySegments) => {
      return querySegments.join("/");
    }),
    doc: jest.fn((...querySegments) => {
      return querySegments.join("/");
    }),
    addDoc: jest.fn(() => ({
      id: null,
    })),
    serverTimestamp: jest.fn(() => new Date()),
    getDoc: jest.fn(),
    setDoc: jest.fn(),
    deleteDoc: jest.fn(),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("saveStartTime", () => {
  it("creates collection ref with correct arguments", async () => {
    const { gameId } = setup();
    await saveStartTime(gameId);

    expect(collection).toBeCalledWith("database", "games", gameId, "pending");
  });

  it("calls addDoc with the correct collection ref and data", async () => {
    const { gameId, playerId } = setup();
    const dateSpy = jest.spyOn(global, "Date");
    await saveStartTime(gameId, playerId);

    const startTime = dateSpy.mock.instances[0];
    expect(addDoc).toBeCalledWith(`database/games/${gameId}/pending`, {
      playerId,
      startTime,
    });
  });

  it("return created document id", async () => {
    addDoc.mockReturnValueOnce({ id: "pending1" });
    const { gameId, playerId, pendingDocId } = setup();
    const returnedId = await saveStartTime(gameId, playerId);

    expect(returnedId).toBe(pendingDocId);
  });
});

describe("computeScore", () => {
  beforeEach(() => {
    const startTime = 1000;
    const endTime = 6000;
    getDoc.mockReturnValueOnce({
      data: () => ({
        startTime: {
          toDate: () => startTime,
        },
        endTime: {
          toDate: () => endTime,
        },
      }),
    });
  });

  it("creates doc ref with correct arguments", async () => {
    const { gameId, pendingDocId } = setup();
    await computeScore(gameId, pendingDocId);

    expect(doc).toBeCalledWith(
      "database",
      "games",
      gameId,
      "pending",
      pendingDocId
    );
  });

  it("calls getDoc with the correct doc ref", async () => {
    const { gameId, pendingDocId } = setup();
    await computeScore(gameId, pendingDocId);

    expect(getDoc).toBeCalledWith(
      `database/games/${gameId}/pending/${pendingDocId}`
    );
  });

  it("computers the score correctly", async () => {
    const { gameId, pendingDocId } = setup();
    const correctScore = 5000;
    const score = await computeScore(gameId, pendingDocId);

    expect(score).toBe(correctScore);
  });
});

describe("savePlayerName", () => {
  it("creates correct doc ref", async () => {
    const { playerId } = setup();
    await savePlayerName(playerId);
    expect(doc).toBeCalledWith("database", "players", playerId);
  });

  it("calls setDoc with correct parameters", async () => {
    const { name, playerId } = setup();
    await savePlayerName(playerId, name);
    expect(setDoc).toBeCalledWith(`database/players/${playerId}`, {
      name,
    });
  });
});

describe("getPlayerDoc", () => {
  let returnedDoc;
  beforeEach(() => {
    returnedDoc = {
      id: 15,
      data: () => ({
        name: "Haunted Knight",
      }),
    };
    getDoc.mockReturnValueOnce(returnedDoc);
  });

  it("creates correct doc ref", async () => {
    const { playerId } = setup();
    await getPlayerDoc(playerId);
    expect(doc).toBeCalledWith("database", "players", playerId);
  });

  it("calls getDoc with correct parameters", async () => {
    const { playerId } = setup();
    await getPlayerDoc(playerId);
    expect(getDoc).toBeCalledWith(`database/players/${playerId}`);
  });

  it("returns correct doc", async () => {
    const { playerId } = setup();
    const recievedDoc = await getPlayerDoc(playerId);
    expect(recievedDoc).toBe(returnedDoc);
  });
});

describe("deletePending", () => {
  it("creates correct doc ref", async () => {
    const { gameId, pendingDocId } = setup();
    await deletePending(gameId, pendingDocId);

    expect(doc).toBeCalledWith(
      "database",
      "games",
      gameId,
      "pending",
      pendingDocId
    );
  });

  it("calls deleteDoc with correct parameters", async () => {
    const { gameId, pendingDocId } = setup();
    await deletePending(gameId, pendingDocId);

    expect(deleteDoc).toBeCalledWith(
      `database/games/${gameId}/pending/${pendingDocId}`
    );
  });
});

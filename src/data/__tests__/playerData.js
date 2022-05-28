import { addDoc, doc, collection, getDoc } from "firebase/firestore";

import { computeScore, saveStartTime } from "../playerData";

function setup() {
  const gameId = "game1";
  const playerId = "player1";
  const pendingDocId = "pending1";
  return { gameId, playerId, pendingDocId };
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
    getDoc: jest.fn(),
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
    getDoc.mockReturnValueOnce({
      data: () => ({
        startTime: {
          toDate: () => startTime,
        },
      }),
    });

    Date.now = jest.fn(() => 6000);
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

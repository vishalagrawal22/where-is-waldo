import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

import { getCharacterLocation } from "../location";

jest.mock("../../firebase-config", () => {
  return {
    db: "database",
  };
});

jest.mock("firebase/firestore", () => {
  return {
    doc: jest.fn((...querySegments) => {
      return querySegments.join("/");
    }),
    getDoc: jest.fn(() => ({
      data: () => {
        return { x: -1, y: -1 };
      },
    })),
  };
});

describe("getCharacterLocation", () => {
  it("creates a doc object with correct parameters", async () => {
    const gameId = 1;
    const characterId = 2;
    await getCharacterLocation(gameId, characterId);
    expect(doc).toBeCalledWith(db, "games", gameId, "locations", characterId);
  });

  it("calls getDoc with correct document reference", async () => {
    const gameId = 1;
    const characterId = 2;
    await getCharacterLocation(gameId, characterId);
    expect(getDoc).toBeCalledWith("database/games/1/locations/2");
  });

  it("returns correct CharacterLocation object", async () => {
    getDoc.mockImplementationOnce(() => {
      return {
        data: () => {
          return { x: 10, y: 15 };
        },
      };
    });

    const gameId = 1;
    const characterId = 2;
    const location = await getCharacterLocation(gameId, characterId);
    expect(location).toEqual({
      x: 10,
      y: 15,
    });
  });
});

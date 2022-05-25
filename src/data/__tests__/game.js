import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

import { getGameData } from "../game";

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
      id: 1,
      data: () => {
        return {
          imageURL: "images/game.png",
          imageName: "game",
          characters: [
            {
              id: 52,
              name: "character",
              imageURL: "images/character.png",
            },
          ],
        };
      },
    })),
  };
});

describe("getGameData", () => {
  it("creates a doc object with correct parameters", async () => {
    const gameId = 50;
    await getGameData(gameId);
    expect(doc).toBeCalledWith(db, "games", gameId);
  });

  it("calls getDoc with correct document reference", async () => {
    const gameId = 50;
    await getGameData(gameId);
    expect(getDoc).toBeCalledWith("database/games/50");
  });

  it("returns correct CharacterLocation object", async () => {
    getDoc.mockImplementationOnce(() => {
      return {
        id: 50,
        data: () => {
          return {
            imageURL: "www.example.com",
            imageName: "waldo at beach",
            characters: [
              {
                id: 1,
                name: "waldo",
                imageURL: "images/waldo.png",
              },
              {
                id: 2,
                name: "wizard",
                imageURL: "images/wizard.png",
              },
            ],
          };
        },
      };
    });

    const gameId = 50;
    const game = await getGameData(gameId);
    expect(game).toEqual({
      id: 50,
      image: {
        name: "waldo at beach",
        URL: "www.example.com",
      },
      characters: [
        {
          id: 1,
          name: "waldo",
          imageURL: "images/waldo.png",
        },
        {
          id: 2,
          name: "wizard",
          imageURL: "images/wizard.png",
        },
      ],
    });
  });
});

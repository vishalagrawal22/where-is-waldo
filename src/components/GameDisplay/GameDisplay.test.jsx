import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import * as data from "../../data/game";
import GameDisplay from "./GameDisplay";

function testSetup() {
  const id = 50;
  const image = {
    name: "waldo at beach",
    URL: "www.example.com",
  };
  const characters = [
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
  ];
  return { id, image, characters };
}

jest.mock("../../firebase-config", () => {
  return {
    __esModule: true,
    db: "database",
  };
});

jest.mock("firebase/firestore", () => {
  return {
    __esModule: true,
    doc: jest.fn(),
    getDoc: jest.fn(),
  };
});

data.getGameData = jest.fn(() => {
  return new Promise(() => {});
});

jest.mock("../CharacterCard", () => {
  return {
    __esModule: true,
    default: ({ character, disabled = false }) => {
      return (
        <div>
          {JSON.stringify({
            character,
            disabled,
          })}
        </div>
      );
    },
  };
});

jest.mock("../ImageDisplay", () => {
  return {
    __esModule: true,
    default: ({ game }) => {
      return <div>{JSON.stringify(game.image)}</div>;
    },
  };
});

describe("GameDisplay", () => {
  describe("data fetching", () => {
    it("calls getGameData with correct id", async () => {
      const { id } = testSetup();
      render(<GameDisplay gameId={id} />);

      expect(data.getGameData).toBeCalledWith(id);
    });

    it("renders loading when data is being fetched", async () => {
      render(<GameDisplay />);

      const loading = screen.getByText("loading...");
      expect(loading).toBeInTheDocument();
    });

    it("renders error message when data fetch fails", async () => {
      data.getGameData.mockImplementationOnce(() => Promise.reject(1));
      render(<GameDisplay />);

      await waitForElementToBeRemoved(() => screen.queryByText("loading..."));

      const error = screen.getByText("unable to fetch data!");
      expect(error).toBeInTheDocument();
    });

    it("renders received image correctly", async () => {
      const { id, image, characters } = testSetup();
      data.getGameData.mockImplementationOnce(() =>
        Promise.resolve({
          id,
          image,
          characters,
        })
      );
      render(<GameDisplay />);

      await waitForElementToBeRemoved(() => screen.queryByText("loading..."));

      const imageDisplay = screen.getByText(JSON.stringify(image));
      expect(imageDisplay).toBeInTheDocument();
    });

    it("renders received characters correctly", async () => {
      const { id, image, characters } = testSetup();
      data.getGameData.mockImplementationOnce(() =>
        Promise.resolve({
          id,
          image,
          characters,
        })
      );
      render(<GameDisplay />);

      await waitForElementToBeRemoved(() => screen.queryByText("loading..."));

      for (const character of characters) {
        const characterDisplay = screen.getByText(
          JSON.stringify({
            character,
            disabled: false,
          })
        );
        expect(characterDisplay).toBeInTheDocument();
      }
    });
  });
});

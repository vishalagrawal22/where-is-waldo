import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import GameFactory from "../../data/game.factory";
import ImageDisplay from "./ImageDisplay";
import CharacterFactory from "../../data/character.factory";

describe("ImageDisplay", () => {
  it("renders the provided image correctly", () => {
    const game = GameFactory(null, "game1", "images/game1.png", []);
    render(<ImageDisplay game={game} />);

    const image = screen.getByAltText("game1");
    expect(image).toHaveAttribute("src", "images/game1.png");
  });

  it("renders the dropbox on clicking the image", () => {
    const game = GameFactory(null, "game1", null, []);
    render(<ImageDisplay game={game} />);

    const image = screen.getByAltText("game1");
    fireEvent.click(image, {
      clientX: 40,
      clientY: 50,
    });

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown.style.left).toBe("60px");
    expect(dropdown.style.top).toBe("70px");
  });

  describe("when character is clicked", () => {
    it("closes dropdown", () => {
      const game = GameFactory(null, "game1", null, [
        CharacterFactory(1, "Waldo"),
        CharacterFactory(2, "Wizard"),
      ]);
      render(<ImageDisplay game={game} />);

      const image = screen.getByAltText("game1");
      fireEvent.click(image);

      const character = screen.getByText("Waldo");
      fireEvent.click(character);

      const dropdown = screen.queryByTestId("dropdown");
      expect(dropdown).not.toBeInTheDocument();
    });

    it("calls onChooseCharacter", () => {
      const game = GameFactory(null, "game1", null, [
        CharacterFactory(1, "Waldo"),
        CharacterFactory(2, "Wizard"),
      ]);
      const onChooseCharacter = jest.fn();
      render(
        <ImageDisplay game={game} onChooseCharacter={onChooseCharacter} />
      );

      const image = screen.getByAltText("game1");
      fireEvent.click(image);
      const character = screen.getByText("Wizard");
      fireEvent.click(character);

      expect(onChooseCharacter).toBeCalledTimes(1);
    });

    it("calls onChooseCharacter with correct location and character id", () => {
      const game = GameFactory(null, "game1", null, [
        CharacterFactory(1, "Waldo"),
        CharacterFactory(2, "Wizard"),
      ]);
      const onChooseCharacter = jest.fn();
      render(
        <ImageDisplay game={game} onChooseCharacter={onChooseCharacter} />
      );

      const image = screen.getByAltText("game1");
      fireEvent.click(image, {
        clientX: 40,
        clientY: 50,
      });
      const character = screen.getByText("Wizard");
      fireEvent.click(character);

      expect(onChooseCharacter).toBeCalledWith({ x: 40, y: 50 }, 2);
    });
  });
});

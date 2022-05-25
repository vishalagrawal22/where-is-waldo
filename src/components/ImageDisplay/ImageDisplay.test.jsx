import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import GameFactory from "../../data/game.factory";
import ImageDisplay, { CHARACTER_SELECT_CIRCLE_RADIUS } from "./ImageDisplay";
import CharacterFactory from "../../data/character.factory";
import { getBoundingClientRect } from "../../helpers/dom";

jest.mock("../../helpers/dom", () => {
  return {
    ...jest.requireActual("../../helpers/dom"),
    getBoundingClientRect: jest.fn(() => ({
      left: 0,
      top: 0,
      height: 650,
      width: 900,
    })),
  };
});

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
    expect(dropdown.style.left).toBe(
      `${40 + CHARACTER_SELECT_CIRCLE_RADIUS}px`
    );
    expect(dropdown.style.top).toBe(`${50 + CHARACTER_SELECT_CIRCLE_RADIUS}px`);
  });

  it("renders the target box on clicking the image", () => {
    const game = GameFactory(null, "game1", null, []);
    render(<ImageDisplay game={game} />);

    const image = screen.getByAltText("game1");
    fireEvent.click(image, {
      clientX: 40,
      clientY: 50,
    });

    const targetCircle = screen.getByTestId("target-circle");
    expect(targetCircle).toBeInTheDocument();
    expect(targetCircle.style.left).toBe(
      `${40 - CHARACTER_SELECT_CIRCLE_RADIUS}px`
    );
    expect(targetCircle.style.top).toBe(
      `${50 - CHARACTER_SELECT_CIRCLE_RADIUS}px`
    );
  });

  it("relocates the dropbox on reclicking the image", () => {
    const game = GameFactory(null, "game1", null, []);
    render(<ImageDisplay game={game} />);

    const image = screen.getByAltText("game1");
    fireEvent.click(image, {
      clientX: 40,
      clientY: 50,
    });

    fireEvent.click(image, {
      clientX: 75,
      clientY: 45,
    });

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown.style.left).toBe(
      `${75 + CHARACTER_SELECT_CIRCLE_RADIUS}px`
    );
    expect(dropdown.style.top).toBe(`${45 + CHARACTER_SELECT_CIRCLE_RADIUS}px`);
  });

  it("relocates the target box on reclicking the image", () => {
    const game = GameFactory(null, "game1", null, []);
    render(<ImageDisplay game={game} />);

    const image = screen.getByAltText("game1");
    fireEvent.click(image, {
      clientX: 40,
      clientY: 50,
    });

    fireEvent.click(image, {
      clientX: 75,
      clientY: 45,
    });

    const targetCircle = screen.getByTestId("target-circle");
    expect(targetCircle).toBeInTheDocument();
    expect(targetCircle.style.left).toBe(
      `${75 - CHARACTER_SELECT_CIRCLE_RADIUS}px`
    );
    expect(targetCircle.style.top).toBe(
      `${45 - CHARACTER_SELECT_CIRCLE_RADIUS}px`
    );
  });

  describe("when character is clicked", () => {
    it("closes dropdown", () => {
      const game = GameFactory(null, "game1", null, [
        CharacterFactory(1, "Waldo"),
        CharacterFactory(2, "Wizard"),
      ]);
      render(<ImageDisplay game={game} />);

      const image = screen.getByAltText("game1");
      fireEvent.click(image, {
        clientX: CHARACTER_SELECT_CIRCLE_RADIUS,
        clientY: CHARACTER_SELECT_CIRCLE_RADIUS,
      });

      const character = screen.getByText("Waldo");
      fireEvent.click(character);

      const dropdown = screen.queryByTestId("dropdown");
      expect(dropdown).not.toBeInTheDocument();
    });

    it("removes the target box", () => {
      const game = GameFactory(null, "game1", null, [
        CharacterFactory(1, "Waldo"),
        CharacterFactory(2, "Wizard"),
      ]);
      render(<ImageDisplay game={game} />);

      const image = screen.getByAltText("game1");
      fireEvent.click(image, {
        clientX: CHARACTER_SELECT_CIRCLE_RADIUS,
        clientY: CHARACTER_SELECT_CIRCLE_RADIUS,
      });

      const character = screen.getByText("Waldo");
      fireEvent.click(character);

      const targetCircle = screen.queryByTestId("target-circle");
      expect(targetCircle).not.toBeInTheDocument();
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
      fireEvent.click(image, {
        clientX: CHARACTER_SELECT_CIRCLE_RADIUS,
        clientY: CHARACTER_SELECT_CIRCLE_RADIUS,
      });
      const character = screen.getByText("Wizard");
      fireEvent.click(character);

      expect(onChooseCharacter).toBeCalledTimes(1);
    });

    it("calls onChooseCharacter with correct location, dimensions and character id", () => {
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

      expect(onChooseCharacter).toBeCalledWith(
        {
          x: 40,
          y: 50,
          radius: CHARACTER_SELECT_CIRCLE_RADIUS,
        },
        {
          height: 650,
          width: 900,
        },
        2
      );
    });
  });

  describe("when the image is not located at the top corner", () => {
    it("renders the dropbox on clicking the image", () => {
      getBoundingClientRect.mockReturnValueOnce({
        left: 100,
        top: 200,
        height: 650,
        width: 900,
      });
      const game = GameFactory(null, "game1", null, []);
      render(<ImageDisplay game={game} />);

      const image = screen.getByAltText("game1");
      fireEvent.click(image, {
        clientX: 150,
        clientY: 300,
      });

      const dropdown = screen.getByTestId("dropdown");
      expect(dropdown).toBeInTheDocument();
      expect(dropdown.style.left).toBe(
        `${50 + CHARACTER_SELECT_CIRCLE_RADIUS}px`
      );
      expect(dropdown.style.top).toBe(
        `${100 + CHARACTER_SELECT_CIRCLE_RADIUS}px`
      );
    });

    it("renders the target box on clicking the image", () => {
      getBoundingClientRect.mockReturnValueOnce({
        left: 100,
        top: 200,
        height: 650,
        width: 900,
      });
      const game = GameFactory(null, "game1", null, []);
      render(<ImageDisplay game={game} />);

      const image = screen.getByAltText("game1");
      fireEvent.click(image, {
        clientX: 200,
        clientY: 400,
      });

      const targetCircle = screen.getByTestId("target-circle");
      expect(targetCircle).toBeInTheDocument();
      expect(targetCircle.style.left).toBe(
        `${100 - CHARACTER_SELECT_CIRCLE_RADIUS}px`
      );
      expect(targetCircle.style.top).toBe(
        `${200 - CHARACTER_SELECT_CIRCLE_RADIUS}px`
      );
    });
  });

  describe("when clicked at corner", () => {
    it("does not renders the dropbox on clicking the image", () => {
      const game = GameFactory(null, "game1", null, []);
      render(<ImageDisplay game={game} />);

      const image = screen.getByAltText("game1");
      fireEvent.click(image, {
        clientX: 10,
        clientY: 10,
      });

      const dropdown = screen.queryByTestId("dropdown");
      expect(dropdown).not.toBeInTheDocument();
    });

    it("does not renders the target box on clicking the image", () => {
      const game = GameFactory(null, "game1", null, []);
      render(<ImageDisplay game={game} />);

      const image = screen.getByAltText("game1");
      fireEvent.click(image, {
        clientX: 10,
        clientY: 10,
      });

      const targetCircle = screen.queryByTestId("target-circle");
      expect(targetCircle).not.toBeInTheDocument();
    });
  });
});

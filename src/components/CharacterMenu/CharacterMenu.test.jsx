import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterFactory from "../../data/character.factory";
import CharacterMenu from "./CharacterMenu";

describe("CharacterMenu", () => {
  it("renders provided characters", () => {
    const characters = [
      CharacterFactory(1, "Waldo"),
      CharacterFactory(2, "Wizard"),
    ];
    render(<CharacterMenu characters={characters} />);

    expect(screen.getByText("Waldo")).toBeInTheDocument();
    expect(screen.getByText("Wizard")).toBeInTheDocument();
  });

  it("calls the onCharacterSelect function", async () => {
    const user = userEvent.setup();
    const characters = [CharacterFactory(1, "Waldo")];
    const handleCharacterSelect = jest.fn();
    render(
      <CharacterMenu
        characters={characters}
        onCharacterSelect={handleCharacterSelect}
      />
    );

    const characterButton = screen.getByText("Waldo");
    await user.click(characterButton);

    expect(handleCharacterSelect).toBeCalledTimes(1);
  });

  it("calls the onCharacterSelect function with the correct character id", async () => {
    const user = userEvent.setup();
    const characters = [
      CharacterFactory(1, "Waldo"),
      CharacterFactory(2, "Wizard"),
      CharacterFactory(3, "Wilma"),
    ];
    const handleCharacterSelect = jest.fn();
    render(
      <CharacterMenu
        characters={characters}
        onCharacterSelect={handleCharacterSelect}
      />
    );

    const characterButton = screen.getByText("Wizard");
    await user.click(characterButton);

    expect(handleCharacterSelect).toBeCalledWith(2);
  });
});

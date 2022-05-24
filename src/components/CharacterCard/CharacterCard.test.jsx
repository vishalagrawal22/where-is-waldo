import React from "react";
import { render, screen } from "@testing-library/react";
import CharacterFactory from "../../data/character.factory";
import CharacterCard from "./CharacterCard";

describe("CharacterCard", () => {
  it("renders the correct image", () => {
    const character = CharacterFactory(1, "waldo", "waldo-image.png");
    render(<CharacterCard character={character} />);

    const image = screen.getByAltText("waldo");
    expect(image).toHaveAttribute("src", "waldo-image.png");
  });

  it("renders the correct name", () => {
    const character = CharacterFactory(1, "waldo", "waldo-image.png");
    render(<CharacterCard character={character} />);

    const name = screen.getByText("waldo");
    expect(name).toBeInTheDocument();
  });

  describe("when not disabled", () => {
    it("should not reduce image opactiy", () => {
      const character = CharacterFactory(1, "waldo", "waldo-image.png");
      render(<CharacterCard character={character} />);

      const image = screen.getByAltText("waldo");
      expect(image.style.opacity).toBe("1");
    });

    it("should not have grey class", () => {
      const character = CharacterFactory(1, "waldo", "waldo-image.png");
      render(<CharacterCard character={character} />);

      const image = screen.getByAltText("waldo");
      expect(image.className).not.toBe("grey");
    });
  });

  describe("when disabled", () => {
    it("should reduce image opactiy", () => {
      const character = CharacterFactory(1, "waldo", "waldo-image.png");
      render(<CharacterCard character={character} disabled={true} />);

      const image = screen.getByAltText("waldo");
      expect(image.style.opacity).toBe("0.6");
    });

    it("should have grey class", () => {
      const character = CharacterFactory(1, "waldo", "waldo-image.png");
      render(<CharacterCard character={character} disabled={true} />);

      const image = screen.getByAltText("waldo");
      expect(image.className).toBe("grey");
    });
  });
});

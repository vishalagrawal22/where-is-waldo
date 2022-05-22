import CharacterFactory from "../character.factory";
import GameFactory from "../game.factory";

test("game factory creates correct objects", () => {
  const game = GameFactory(1, "waldo at beach", "images/game1.png", [
    CharacterFactory(5, "Waldo"),
    CharacterFactory(10, "Wizard"),
  ]);

  expect(game.id).toBe(1);
  expect(game.image.name).toBe("waldo at beach");
  expect(game.image.URL).toBe("images/game1.png");
  expect(game.characters.length).toBe(2);
  expect(game.characters[0].name).toBe("Waldo");
  expect(game.characters[1].name).toBe("Wizard");
});

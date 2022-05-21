import CharacterFactory from "../character.factory";

test("character factory creates correct objects", () => {
  const character = CharacterFactory(1, "Waldo", "images/waldo.png");
  expect(character.id).toBe(1);
  expect(character.name).toBe("Waldo");
  expect(character.imageURL).toBe("images/waldo.png");
});

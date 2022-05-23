import CharacterLocationFactory from "../character-location.factory";

test("character location factory creates correct objects", () => {
  const characterLocation = CharacterLocationFactory(5, 10, 15);
  expect(characterLocation.x).toBe(5);
  expect(characterLocation.y).toBe(10);
  expect(characterLocation.radius).toBe(15);
});

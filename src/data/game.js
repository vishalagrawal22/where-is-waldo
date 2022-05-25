import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

import CharacterFactory from "./character.factory";
import GameFactory from "./game.factory";

export async function getGameData(gameId) {
  const docRef = doc(db, "games", gameId);
  const game = await getDoc(docRef);
  const { imageName, imageURL, characters } = game.data();
  const id = game.id;
  const charactersObjects = characters.map(({ id, name, imageURL }) =>
    CharacterFactory(id, name, imageURL)
  );
  return GameFactory(id, imageName, imageURL, charactersObjects);
}

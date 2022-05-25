import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";

import CharacterLocationFactory from "./character-location.factory.js";

export async function getCharacterLocation(gameId, characterId) {
  const docRef = doc(db, "games", gameId, "locations", characterId);
  const location = await getDoc(docRef);
  const { x, y } = location.data();
  return CharacterLocationFactory(x, y);
}

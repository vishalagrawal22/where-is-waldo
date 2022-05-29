import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

import CharacterFactory from "./character.factory";
import GameFactory from "./game.factory";

function extractGameFromDoc(gameDoc) {
  const { imageName, imageURL, characters } = gameDoc.data();
  const id = gameDoc.id;
  const charactersObjects = characters.map(({ id, name, imageURL }) =>
    CharacterFactory(id, name, imageURL)
  );
  const game = GameFactory(id, imageName, imageURL, charactersObjects);
  return game;
}

export const GAME_NOT_FOUND = "game not found!";
export async function getGameData(gameId) {
  const docRef = doc(db, "games", gameId);
  const gameDoc = await getDoc(docRef);
  if (gameDoc.exists()) {
    return extractGameFromDoc(gameDoc);
  } else {
    throw GAME_NOT_FOUND;
  }
}

export async function getAllGames() {
  const collectionRef = collection(db, "games");
  const gameDocs = await getDocs(collectionRef);
  const games = gameDocs.docs.map((gameDoc) => extractGameFromDoc(gameDoc));
  return games;
}

import {
  doc,
  collection,
  query,
  getDocs,
  getDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase-config";

import CharacterFactory from "./character.factory";
import GameFactory from "./game.factory";
import PlayerScoreFactory from "./player-score.factory";

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

function extractPlayerFromDoc(playerScoreDoc, rank = null) {
  const { name, score } = playerScoreDoc.data();
  const id = playerScoreDoc.id;
  const playerScore = PlayerScoreFactory(id, name, rank, score);
  return playerScore;
}

export async function getTopTenScore(gameId) {
  const collectionRef = collection(db, "games", gameId, "scores");
  const q = query(collectionRef, orderBy("score"), limit(5));
  const playerScoreDocs = await getDocs(q);
  const playerScores = playerScoreDocs.docs.map((playerScoreDoc, index) =>
    extractPlayerFromDoc(playerScoreDoc, index + 1)
  );
  return playerScores;
}

export async function getPlayerScore(gameId, playerId) {
  const docRef = doc(db, "games", gameId, "scores", playerId);
  const playerScoreDoc = await getDoc(docRef);
  if (!playerScoreDoc.exists()) {
    return null;
  }
  const playerScore = extractPlayerFromDoc(playerScoreDoc);
  return playerScore;
}

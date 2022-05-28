import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";
import { db } from "../firebase-config";

export async function saveStartTime(gameId, playerId) {
  const pendingRef = collection(db, "games", gameId, "pending");
  const startTime = new Date();
  const docRef = await addDoc(pendingRef, {
    playerId,
    startTime,
  });
  return docRef.id;
}

export async function computeScore(gameId, pendingId) {
  const pendingDocRef = doc(db, "games", gameId, "pending", pendingId);
  const pendingDoc = await getDoc(pendingDocRef);
  const startTime = pendingDoc.data().startTime.toDate();
  const currentTime = Date.now();
  const score = currentTime - startTime;
  return score;
}

export async function getName(playerId) {
  const playerDocRef = doc(db, "players", playerId);
  const playerDoc = await getDoc(playerDocRef);
  return playerDoc.data().name;
}

export async function setName(playerId, name) {
  const playerDocRef = doc(db, "players", playerId);
  await setDoc(playerDocRef, {
    name,
  });
}

export async function deletePending(gameId, pendingId) {
  const pendingDocRef = doc(db, "games", gameId, "pending", pendingId);
  await deleteDoc(pendingDocRef);
}

export async function updatePlayerScore(gameId, playerId, pendingId) {
  try {
    const score = await computeScore(gameId, pendingId);
    await deletePending(gameId, pendingId);
    const name = await getName(playerId);
    await runTransaction(db, async (transaction) => {
      const playerScoreDocRef = doc(db, "games", gameId, "scores", playerId);
      const playerScoreDoc = await transaction.get(playerScoreDocRef);
      if (!playerScoreDoc.exists() || score < playerScoreDoc.data().score) {
        transaction.set(playerScoreDocRef, {
          score,
          name,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
}

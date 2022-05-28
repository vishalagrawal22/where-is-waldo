import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
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

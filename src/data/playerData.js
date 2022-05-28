import { addDoc, collection, doc, getDoc } from "firebase/firestore";
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

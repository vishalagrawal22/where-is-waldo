import { addDoc, collection } from "firebase/firestore";
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

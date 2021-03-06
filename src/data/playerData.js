import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

export async function saveStartTime(gameId, playerId) {
  try {
    const pendingRef = collection(db, "games", gameId, "pending");
    const docRef = await addDoc(pendingRef, {
      playerId,
      startTime: serverTimestamp(),
    });
    return docRef.id;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function saveEndTime(gameId, pendingId) {
  try {
    const pendingDocRef = doc(db, "games", gameId, "pending", pendingId);
    await updateDoc(pendingDocRef, {
      endTime: serverTimestamp(),
    });
  } catch (err) {
    console.log(err);
  }
}

export async function computeScore(gameId, pendingId) {
  try {
    const pendingDocRef = doc(db, "games", gameId, "pending", pendingId);
    const pendingDoc = await getDoc(pendingDocRef);
    const startTime = pendingDoc.data().startTime.toDate();
    const endTime = pendingDoc.data().endTime.toDate();
    const score = endTime - startTime;
    return score;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getPlayerDoc(playerId) {
  const playerDocRef = doc(db, "players", playerId);
  const playerDoc = await getDoc(playerDocRef);
  return playerDoc;
}

export async function savePlayerName(playerId, name) {
  try {
    const playerDocRef = doc(db, "players", playerId);
    await setDoc(playerDocRef, {
      name,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deletePending(gameId, pendingId) {
  try {
    const pendingDocRef = doc(db, "games", gameId, "pending", pendingId);
    await deleteDoc(pendingDocRef);
  } catch (err) {
    console.log(err);
  }
}

export async function updatePlayerScore(gameId, playerId, name, score) {
  try {
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
    console.error(err);
  }
}

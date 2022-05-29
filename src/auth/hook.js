import { useEffect, useState } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

import { auth } from "../firebase-config";

export function usePlayer() {
  const [error, setError] = useState(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (player) => {
        setPlayer(player);
      },
      (err) => {
        setError(err);
      }
    );
    return unsubscribe;
  }, []);

  return { error, player };
}

export async function createPlayer() {
  try {
    await signInAnonymously(auth);
  } catch (err) {
    console.log(err);
  }
}

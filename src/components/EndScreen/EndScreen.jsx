import React, { useEffect, useState } from "react";

import {
  computeScore,
  deletePending,
  getPlayerDoc,
  savePlayerName,
  updatePlayerScore,
} from "../../data/playerData";

import styles from "./EndScreen.module.css";
import Overlay from "../Overlay";

function EndScreen({ gameId, pendingId, player }) {
  const [name, setName] = useState(null);
  const [score, setScore] = useState(null);
  const [formName, setFormName] = useState("");

  useEffect(() => {
    (async function () {
      const playerScore = await computeScore(gameId, pendingId);
      await deletePending(gameId, pendingId);
      setScore(playerScore);
    })();
  }, [gameId, pendingId]);

  useEffect(() => {
    (async function () {
      const playerDoc = await getPlayerDoc(player.uid);
      if (playerDoc.exists()) {
        setName(playerDoc.data().name);
      }
    })();
  }, [player]);

  async function handleGoToHome() {}

  async function handleGoToLeaderboard() {
    const playerName = name || (formName ? formName : null);
    if (playerName !== null) {
      if (name === null) {
        await savePlayerName(player.uid, playerName);
      }
      await updatePlayerScore(gameId, player.uid, playerName, score);
    }
  }

  return (
    <Overlay>
      <div className={styles["container"]}>
        <div className={styles["score"]}>
          You completed the game in {score / 1000}s
        </div>

        {name === null && (
          <div>
            <label htmlFor="playerName">Enter your name: </label>
            <input
              type="text"
              value={formName}
              onChange={(event) => {
                setFormName(event.target.value);
              }}
            />
          </div>
        )}

        <div className={styles["action-buttons"]}>
          <button className={styles["secondary"]} onClick={handleGoToHome}>
            Go to home
          </button>
          <button className={styles["primary"]} onClick={handleGoToLeaderboard}>
            Go to leaderboard
          </button>
        </div>
      </div>
    </Overlay>
  );
}

export default EndScreen;

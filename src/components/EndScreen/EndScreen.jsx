import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getPlayerDoc,
  savePlayerName,
  updatePlayerScore,
} from "../../data/playerData";

import styles from "./EndScreen.module.css";
import Overlay from "../Overlay";

function EndScreen({ score, gameId, player }) {
  const [name, setName] = useState(null);
  const [formName, setFormName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const playerDoc = await getPlayerDoc(player.uid);
      if (playerDoc.exists()) {
        setName(playerDoc.data().name);
      }
    })();
  }, [player]);

  async function handleGoToHome() {
    navigate(`/`);
  }

  async function handleGoToLeaderboard() {
    const playerName = name || (formName ? formName : null);
    if (playerName !== null) {
      if (name === null) {
        await savePlayerName(player.uid, playerName);
      }
      await updatePlayerScore(gameId, player.uid, playerName, score);
    }
    navigate(`/leaderboard/${gameId}`);
  }

  return (
    <Overlay>
      <div className={styles["container"]}>
        <div className={styles["score"]}>
          You completed the game in {score / 1000}s
        </div>

        {name === null && (
          <div className={styles["name-input-container"]}>
            <label className={styles["name-input-label"]} htmlFor="playerName">
              Name:{" "}
            </label>
            <input
              type="text"
              className={styles["name-input"]}
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

import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./GameCard.module.css";

function PlayButton({ gameId }) {
  const navigate = useNavigate();
  return (
    <button
      className={styles["btn"]}
      onClick={() => {
        navigate(`/game/${gameId}`);
      }}>
      Play Game
    </button>
  );
}

function LeaderboardButton({ gameId }) {
  const navigate = useNavigate();
  return (
    <button
      className={styles["btn"]}
      onClick={() => {
        navigate(`/leaderboard/${gameId}`);
      }}>
      See Leaderboard
    </button>
  );
}

function GameCard({ game, buttonType }) {
  return (
    <div className={styles["card"]}>
      <img
        src={game.image.URL}
        alt={game.image.name}
        className={styles["game-image"]}
      />
      <div className={styles["name-text"]}>{game.image.name}</div>
      {buttonType === "play" && <PlayButton gameId={game.id} />}
      {buttonType === "leaderboard" && <LeaderboardButton gameId={game.id} />}
    </div>
  );
}

export default GameCard;

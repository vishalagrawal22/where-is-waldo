import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Header.module.css";
import imageSrc from "./Header-image.jpeg";

function getText(type) {
  if (type === "home") return "Home";
  else if (type === "game") return "Game";
  else if (type === "leaderboard") return "Leaderboard";
}

function Header({ type }) {
  const { gameId } = useParams();
  const navigate = useNavigate();
  function handleClick() {
    if (type === "home") {
      navigate("/");
    } else if (type === "game") {
      if (gameId) {
        navigate(`/game/${gameId}`);
      } else {
        navigate(`/game`);
      }
    } else if (type === "leaderboard") {
      if (gameId) {
        navigate(`/leaderboard/${gameId}`);
      } else {
        navigate(`/leaderboard`);
      }
    }
  }

  return (
    <div className={styles["container"]}>
      <img className={styles["header-image"]} src={imageSrc} alt="header" />
      <div className={styles["header-text"]}>Where's Waldo</div>
      <button className={styles["go-to-button"]} onClick={handleClick}>
        Go To {getText(type)}
      </button>
    </div>
  );
}

export default Header;

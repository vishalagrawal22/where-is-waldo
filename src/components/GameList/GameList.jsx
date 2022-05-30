import { useEffect, useState } from "react";

import { getAllGames } from "../../data/game";
import GameCard from "../GameCard";

import styles from "./GameList.module.css";

function GameList({ buttonType }) {
  const [games, setGames] = useState([]);
  useEffect(() => {
    (async function fetchData() {
      const games = await getAllGames();
      setGames(games);
    })();
  });
  return (
    <div className={styles["game-list"]}>
      {games.map((game) => (
        <GameCard game={game} buttonType={buttonType} key={game.id} />
      ))}
    </div>
  );
}

export default GameList;

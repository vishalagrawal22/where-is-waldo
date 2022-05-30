import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./Leaderboard.module.css";

import { usePlayer } from "../../auth/hook";
import { getTopTenScore, getPlayerScore, getGameData } from "../../data/game";
import GameCard from "../GameCard";

function Leaderboard() {
  const { gameId } = useParams();
  const { player: currentPlayer } = usePlayer();
  const [playerScores, setPlayerScores] = useState([]);
  const [game, setGame] = useState(null);

  useEffect(() => {
    (async () => {
      let playerScores = await getTopTenScore(gameId);
      if (currentPlayer !== null) {
        let currentPlayerScore = playerScores.find(
          (playerScore) => playerScore.id === currentPlayer.uid
        );
        if (currentPlayerScore === undefined) {
          currentPlayerScore = await getPlayerScore(gameId, currentPlayer.uid);

          if (currentPlayerScore) {
            playerScores.push(currentPlayerScore);
          }
        }
      }

      const game = await getGameData(gameId);
      setGame(game);
      setPlayerScores(playerScores);
    })();
  }, [gameId, currentPlayer]);

  return (
    <div className={styles["container"]}>
      {game && <GameCard game={game} buttonType="play" />}
      <div className={styles["table-container"]}>
        <div className={styles["score-table-heading"]}>Leaderboard</div>
        <table className={styles["score-table"]}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {playerScores.map((playerScore) => (
              <tr
                key={playerScore.id}
                id={
                  currentPlayer && playerScore.id === currentPlayer.uid
                    ? styles["current-player-row"]
                    : ""
                }>
                <td>{playerScore.rank || "-"}</td>
                <td>{playerScore.name}</td>
                <td>{(playerScore.score / 1000).toFixed(2)}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;

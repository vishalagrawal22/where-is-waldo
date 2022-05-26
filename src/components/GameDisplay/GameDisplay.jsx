import React, { useEffect, useState } from "react";
import { getGameData } from "../../data/game";
import ImageDisplay from "../ImageDisplay";
import CharacterCard from "../CharacterCard";

function GameDisplay({ gameId }) {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const gameData = await getGameData(gameId);
        setGameData(gameData);
      } catch (err) {
        setError("unable to fetch data!");
      }
      setIsPending(false);
    }

    fetchData();
  }, [gameId]);

  if (isPending) {
    return <div>loading...</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div>
        {gameData.characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
        <ImageDisplay game={gameData} />
      </div>
    );
  }
}

export default GameDisplay;

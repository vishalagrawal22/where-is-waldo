import React, { useEffect, useState } from "react";

import ImageDisplay from "../ImageDisplay";
import CharacterCard from "../CharacterCard";
import EndScreen from "../EndScreen";

import { createPlayer, usePlayer } from "../../auth/hook";
import { getGameData } from "../../data/game";
import { getCharacterLocation } from "../../data/location";
import { saveStartTime } from "../../data/playerData";

import { liesInside } from "../../helpers/circle";

import styles from "./GameDisplay.module.css";

function GameDisplay({ gameId }) {
  const { player } = usePlayer();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [pendingId, setPendingId] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [lastClickResult, setLastClickResult] = useState(null);
  const [foundCharacterIds, setFoundCharacterIds] = useState(new Set());

  useEffect(() => {
    async function fetchData() {
      try {
        const gameData = await getGameData(gameId);
        const pendingId = await saveStartTime(gameId, player.uid);
        setPendingId(pendingId);
        setImage(gameData.image);
        setCharacters(gameData.characters);
        setIsPending(false);
      } catch (err) {
        setError("unable to fetch data!");
      }
    }

    (async function setup() {
      if (player === null) {
        try {
          await createPlayer();
        } catch (err) {
          setError("unable to setup timer");
        }
      } else {
        await fetchData();
      }
    })();
  }, [gameId, player]);

  function resetLastClickResult() {
    setLastClickResult(null);
  }

  function getCharacterName(characterId) {
    const character = characters.find(
      (character) => character.id === characterId
    );
    return character.name;
  }

  async function handleChooseCharacter(location, dimensions, characterId) {
    const correctPercentageLocation = await getCharacterLocation(
      gameId,
      characterId
    );

    const { x: px, y: py } = correctPercentageLocation;
    const correctLocation = {
      x: (px * dimensions.width) / 100,
      y: (py * dimensions.height) / 100,
    };

    const found = liesInside(location, correctLocation);
    if (found) {
      setFoundCharacterIds(new Set(foundCharacterIds).add(characterId));
      setLastClickResult({
        text: `You found ${getCharacterName(characterId)}!`,
        type: "success",
      });
    } else {
      setLastClickResult({
        text: `Try Again`,
        type: "failure",
      });
    }
  }

  if (isPending) {
    return <div>loading...</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else {
    const leftCharacters = characters.filter(
      (character) => !foundCharacterIds.has(character.id)
    );

    const game = {
      image,
      characters: leftCharacters,
    };
    return (
      <>
        {characters.length === foundCharacterIds.size && (
          <EndScreen pendingId={pendingId} gameId={gameId} player={player} />
        )}
        <div className={`${styles["character-cards"]}`}>
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              disabled={foundCharacterIds.has(character.id)}
            />
          ))}
        </div>
        <ImageDisplay
          game={game}
          onChooseCharacter={handleChooseCharacter}
          lastClickResult={lastClickResult}
          resetLastClickResult={resetLastClickResult}
        />
      </>
    );
  }
}

export default GameDisplay;

import PropType from "prop-types";
import React, { useState } from "react";

import CharacterMenu from "../CharacterMenu";
import TargetCircle from "../TargetCircle";
import { getBoundingClientRect } from "../../helpers/dom";

export const CHARACTER_SELECT_CIRCLE_RADIUS = 20;

function ImageDisplay({ game, onChooseCharacter }) {
  const [mouseClickLocation, setMouseClickLocation] = useState(null);
  const [boxDimensions, setBoxDimensions] = useState(null);
  function handleClick(event) {
    const rect = getBoundingClientRect(event);
    const x = event.clientX - Math.floor(rect.left);
    const y = event.clientY - Math.floor(rect.top);
    function check(x, y) {
      return (
        0 <= x &&
        x < Math.floor(rect.width) - 2 &&
        0 <= y &&
        y < Math.floor(rect.height) - 2
      );
    }

    if (
      check(x + CHARACTER_SELECT_CIRCLE_RADIUS, y) &&
      check(x - CHARACTER_SELECT_CIRCLE_RADIUS, y) &&
      check(x, y + CHARACTER_SELECT_CIRCLE_RADIUS) &&
      check(x, y - CHARACTER_SELECT_CIRCLE_RADIUS)
    ) {
      setMouseClickLocation({
        x,
        y,
      });
      setBoxDimensions({
        width: rect.width,
        height: rect.height,
      });
    }
  }

  function handleCharacterSelect(characterId) {
    setMouseClickLocation(null);
    onChooseCharacter(
      { ...mouseClickLocation, radius: CHARACTER_SELECT_CIRCLE_RADIUS },
      { ...boxDimensions },
      characterId
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <img
        style={{ width: "100%", height: "100%" }}
        src={game.image.URL}
        alt={game.image.name}
        onClick={handleClick}
      />
      {mouseClickLocation && (
        <>
          <TargetCircle
            left={mouseClickLocation.x}
            top={mouseClickLocation.y}
            radius={CHARACTER_SELECT_CIRCLE_RADIUS}
          />
          <div
            style={{
              position: "absolute",
              left: mouseClickLocation.x + CHARACTER_SELECT_CIRCLE_RADIUS,
              top: mouseClickLocation.y + CHARACTER_SELECT_CIRCLE_RADIUS,
            }}
            data-testid="dropdown">
            <CharacterMenu
              characters={game.characters}
              onCharacterSelect={handleCharacterSelect}
            />
          </div>
        </>
      )}
    </div>
  );
}

const empty = () => {};
ImageDisplay.defaultProps = {
  onChooseCharacter: empty,
};

ImageDisplay.propType = {
  game: PropType.object.isRequired,
  onChooseCharacter: PropType.func.isRequired,
};

export default ImageDisplay;

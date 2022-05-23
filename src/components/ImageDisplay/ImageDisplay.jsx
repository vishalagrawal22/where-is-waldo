import PropType from "prop-types";
import React, { useState } from "react";
import CharacterMenu from "../CharacterMenu";
import TargetCircle from "../TargetCircle";

export const CHARACTER_SELECT_CIRCLE_RADIUS = 20;

function ImageDisplay({ game, onChooseCharacter }) {
  const [dropdownLocation, setDropdownLocation] = useState(null);
  function handleClick(event) {
    setDropdownLocation({
      x: event.clientX,
      y: event.clientY,
    });
  }

  function handleCharacterSelect(characterId) {
    setDropdownLocation(null);
    onChooseCharacter(
      { ...dropdownLocation, radius: CHARACTER_SELECT_CIRCLE_RADIUS },
      characterId
    );
  }

  return (
    <>
      <img src={game.image.URL} alt={game.image.name} onClick={handleClick} />
      {dropdownLocation && (
        <>
          <TargetCircle
            left={dropdownLocation.x}
            top={dropdownLocation.y}
            radius={CHARACTER_SELECT_CIRCLE_RADIUS}
          />
          <div
            style={{
              position: "absolute",
              left: dropdownLocation.x + CHARACTER_SELECT_CIRCLE_RADIUS,
              top: dropdownLocation.y + CHARACTER_SELECT_CIRCLE_RADIUS,
            }}
            data-testid="dropdown">
            <CharacterMenu
              characters={game.characters}
              onCharacterSelect={handleCharacterSelect}
            />
          </div>
        </>
      )}
    </>
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

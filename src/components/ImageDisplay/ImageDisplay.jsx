import PropType from "prop-types";
import React, { useState } from "react";
import CharacterMenu from "../CharacterMenu";
import styles from "./ImageDisplay.module.css";

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
    onChooseCharacter(dropdownLocation, characterId);
  }

  return (
    <>
      <img src={game.image.URL} alt={game.image.name} onClick={handleClick} />
      {dropdownLocation && (
        <>
          <div
            data-testid="target-box"
            className={styles["target-box"]}
            style={{
              position: "absolute",
              left: dropdownLocation.x - 20,
              top: dropdownLocation.y - 20,
            }}></div>
          <div
            style={{
              position: "absolute",
              left: dropdownLocation.x + 20,
              top: dropdownLocation.y + 20,
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

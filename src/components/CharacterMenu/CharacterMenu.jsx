import React from "react";
import PropTypes from "prop-types";

import styles from "./CharacterMenu.module.css";

function CharacterMenu({ characters, onCharacterSelect }) {
  return (
    <ul className={styles["character-list"]}>
      {characters.map((character) => (
        <li
          key={character.id}
          className={styles["character-item"]}
          onClick={() => {
            onCharacterSelect(character.id);
          }}>
          {character.name}
        </li>
      ))}
    </ul>
  );
}

const empty = () => {};
CharacterMenu.defaultProps = {
  onCharacterSelect: empty,
};

CharacterMenu.propTypes = {
  characters: PropTypes.array.isRequired,
  onCharacterSelect: PropTypes.func,
};

export default CharacterMenu;

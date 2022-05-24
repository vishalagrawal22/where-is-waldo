import React from "react";
import PropType from "prop-types";

import styles from "./CharacterCard.module.css";

function CharacterCard({ character, disabled }) {
  return (
    <div className={styles["card"]}>
      <img
        className={disabled ? styles["grey"] : ""}
        style={{ opacity: disabled ? "0.6" : "1" }}
        src={character.imageURL}
        alt={character.name}
      />
      <span>{character.name}</span>
    </div>
  );
}

CharacterCard.defaultProps = {
  disabled: false,
};

CharacterCard.propType = {
  character: PropType.object.isRequired,
  disabled: PropType.bool.isRequired,
};

export default CharacterCard;

import React, { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./ToastBox.module.css";

function ToastBox({ text, textType, duration, clearText }) {
  useEffect(() => {
    if (duration != null) {
      const timer = setTimeout(clearText, duration);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [text, duration, clearText]);
  return text ? (
    <div
      data-testid="toast-box"
      className={`${styles["box"]} ${
        textType === null ? styles["info"] : styles[textType]
      }`}>
      {text}
    </div>
  ) : null;
}

ToastBox.propTypes = {
  text: PropTypes.string,
  textType: PropTypes.oneOf(["failure", "success"]),
  duration: PropTypes.number,
  clearText: PropTypes.func,
};

ToastBox.defaultProps = {
  text: null,
  textType: null,
  duration: null,
  clearText: null,
};

export default ToastBox;

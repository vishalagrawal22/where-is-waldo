import React from "react";
import PropType from "prop-types";

import styles from "./TargetCircle.module.css";

function TargetCircle({ left, top, radius }) {
  const diameter = 2 * radius;
  return (
    <div
      data-testid="target-circle"
      className={styles["circle"]}
      style={{
        width: diameter,
        height: diameter,
        position: "absolute",
        left: (left != null ? left : radius) - radius,
        top: (top != null ? top : radius) - radius,
      }}></div>
  );
}

TargetCircle.defaultProps = {
  left: null,
  top: null,
};

TargetCircle.propType = {
  left: PropType.number,
  top: PropType.number,
  radius: PropType.number.isRequired,
};

export default TargetCircle;

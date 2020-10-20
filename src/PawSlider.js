import React from "react";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const CustomPawSlider = withStyles({
  root: {
    // color: "#909090",
    height: 24,
    display: "flex",
    alignItems: "center",
    padding: "6px",
    width: "calc(100% - 36px)",
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundImage: "url('./slider-thumb.png')",
    marginLeft: -12,
    marginTop: -2,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 8px)",
    top: "calc(-100% - 6px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function PawSlider(props) {
  return (
    <CustomPawSlider
      {...props}
      valueLabelDisplay="auto"
      getAriaLabel={() => "paw slider"}
    />
  );
}

export default PawSlider;

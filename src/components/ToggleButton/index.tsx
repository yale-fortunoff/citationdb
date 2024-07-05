import React from "react";

import Button from "../Button";

export default function ToggleButton(props: any) {
  return (
    <Button onClick={props.handleClick} className={props.status ? "on" : "off"}>
      {props.label}
    </Button>
  );
}

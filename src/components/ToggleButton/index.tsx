import React from "react";

import Button from "../Button";

export default function ToggleButton(props: any) {
  return (
    <div
      onClick={props.handleClick}
      className={`ToggleButton ${props.itemType} ${props.status ? "on" : "off"}`}
    >
      <Button>{props.label}</Button>
    </div>
  );
}

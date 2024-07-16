import { twMerge } from "tailwind-merge";

import Button from "../Button";

export default function ToggleButton(props: any) {
  return (
    <Button
      onClick={props.handleClick}
      className={twMerge(
        props.className,
        props.status ? "" : "bg-white text-[#6e6e6e]",
      )}
    >
      {props.label}
    </Button>
  );
}

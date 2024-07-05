import { twMerge } from "tailwind-merge";

export default function Button(props: any) {
  return (
    <button
      onClick={props.onClick}
      className={twMerge(
        "mx-2.5 bg-[#e8e8e8] tracking-[.5pt] text-white",
        props.className,
      )}
    >
      {props.children}
    </button>
  );
}

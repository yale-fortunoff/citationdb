"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import useLocalDataStore from "~/store";
import Button from "../Button";

export default function SaveButton(props: any) {
  const localData = useLocalDataStore();
  const [alreadySaved, setAlreadySaved] = useState<boolean>(false);

  useEffect(() => {
    let pinnedArray;
    switch (props.type) {
      case "author":
        pinnedArray = localData.authorIDsPinned;
        break;
      case "publication":
        pinnedArray = localData.publicationIDsPinned;
        break;
      case "resource":
        pinnedArray = localData.resourceIDsPinned;
        break;
    }
    if (pinnedArray) {
      setAlreadySaved(pinnedArray.some((id) => id === props.id));
    }
  }, [
    localData.authorIDsPinned,
    localData.publicationIDsPinned,
    localData.resourceIDsPinned,
  ]);

  if (
    !["publication", "author", "resource"].some((type) => type === props.type)
  ) {
    return;
  }

  const handleClick = () => {
    switch (props.type) {
      case "author":
        localData.setAuthorIDsPinned(
          localData.authorIDsPinned.some((id) => id === props.id)
            ? localData.authorIDsPinned.filter((id) => id !== props.id)
            : [...localData.authorIDsPinned, props.id],
        );
        break;
      case "publication":
        localData.setPublicationIDsPinned(
          localData.publicationIDsPinned.some((id) => id === props.id)
            ? localData.publicationIDsPinned.filter((id) => id !== props.id)
            : [...localData.publicationIDsPinned, props.id],
        );
        break;
      case "resource":
        localData.setResourceIDsPinned(
          localData.resourceIDsPinned.some((id) => id === props.id)
            ? localData.resourceIDsPinned.filter((id) => id !== props.id)
            : [...localData.resourceIDsPinned, props.id],
        );
        break;
    }
  };

  return (
    <div
      className={twMerge(
        "absolute -top-20 right-0 transition-[top] group-hover:top-0",
        alreadySaved ? "top-0" : "",
        props.className?.wrapper,
      )}
    >
      <Button
        className={twMerge(
          "mx-0 rounded-[0_8px_0_8px] px-1.5 text-[#6e6e6e]",
          props.className?.button,
        )}
        onClick={handleClick}
      >
        {alreadySaved ? "unpin" : "pin"}
      </Button>
    </div>
  );
}

import { useState } from "react";
import Button from "../Button";

import * as storage from "../../utils/itemStorage";
import { twMerge } from "tailwind-merge";

let saveItem: any, removeItem: any, getSavedItems: any;

/**
 * The author page
 */
export default function SaveButton(props: any) {
  if (props.type === "resource") {
    saveItem = storage.saveResource;
    removeItem = storage.removeResource;
    getSavedItems = storage.getSavedResources;
  } else if (props.type === "author") {
    saveItem = storage.saveAuthor;
    removeItem = storage.removeAuthor;
    getSavedItems = storage.getSavedAuthors;
  } else if (props.type === "publication") {
    saveItem = storage.savePublication;
    removeItem = storage.removePublication;
    getSavedItems = storage.getSavedPublications;
  } else {
    return;
  }

  const [alreadySaved, setAlreadySaved] = useState<any>(isSaved());

  function isSaved() {
    return (
      getSavedItems()
        .map((x: any) => x.id)
        .indexOf(props.id) >= 0
    );
  }

  const setSaved = () => {
    setAlreadySaved(isSaved());
  };

  if (["publication", "author", "resource"].indexOf(props.type) < 0) {
    return null;
  }

  const handleClick = () => {
    alreadySaved ? removeItem(props.id) : saveItem(props.id);
    setSaved();
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

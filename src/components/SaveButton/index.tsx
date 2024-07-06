import { useState } from "react";
import Button from "../Button";

import * as storage from "../../utils/itemStorage";

let saveItem: any, removeItem: any, getSavedItems: any;

/**
 * The author page
 */
export default function SaveButton(props: any) {
  const [alreadySaved, setAlreadySaved] = useState<any>(isSaved());

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

  return (
    <div className={`SaveButton ${alreadySaved ? "unsave" : "save"}`}>
      <Button
        onClick={() => {
          alreadySaved ? removeItem(props.id) : saveItem(props.id);
          setSaved();
        }}
      >
        {alreadySaved ? "unpin" : "pin"}
      </Button>
    </div>
  );
}

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getSavedAuthors,
  getSavedPublications,
  getSavedResources,
  subscribe,
} from "~/utils/itemStorage";

function SavedItemCounter() {
  const [count, setCount] = useState(
    getSavedAuthors().length +
      getSavedPublications().length +
      getSavedResources().length,
  );

  const getCurrentCount = () =>
    getSavedAuthors().length +
    getSavedPublications().length +
    getSavedResources().length;

  const updateCount = () => {
    setCount(getCurrentCount());
  };
  subscribe("counter", updateCount);

  return (
    <>
      {count > 0 ? (
        <Link className="PinsButton" href="/pins">
          <button
            className="Button"
            type="button"
            onClick={() => alert("TODO")}
          >
            {pluralize("pins", count, true)}
          </button>
        </Link>
      ) : null}
    </>
  );
}

/**
 * Not really a bread crumb menu.
 * @param {Object} props
 */
export default function BreadCrumb(props: any) {
  const pathname = usePathname();

  const HomeButton = () => {
    return pathname === "/" ? null : (
      <Link className="HomeButton" href="/">
        <button className="Button" type="button" onClick={() => alert("TODO")}>
          Home
        </button>
      </Link>
    );
  };

  const id = props.id;
  const saveType = props.saveType || "invalid";

  return (
    <nav className="BreadCrumb">
      <div className="breadcrumb-left">
        <HomeButton />
        <SavedItemCounter />
      </div>
      <button className="SaveButton" id={id} type="button">
        Save
      </button>
    </nav>
  );
}

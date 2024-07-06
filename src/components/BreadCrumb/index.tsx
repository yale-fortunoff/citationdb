import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import pluralize from "pluralize";

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
        <Link className="PinsButton" href="/pins" type="button">
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
      <Link
        className="mr-1 box-border flex h-7 flex-col justify-center rounded-lg border-0 bg-[#efefef] px-2.5 py-0 text-center font-bold text-[#6e6e6e] no-underline hover:shadow-yale"
        href="/"
        type="button"
      >
        <button className="Button" type="button" onClick={() => alert("TODO")}>
          Home
        </button>
      </Link>
    );
  };

  const id = props.id;
  const saveType = props.saveType || "invalid";

  return (
    <nav className="flex min-h-8 justify-between text-sm text-[#6e6e6e]">
      <div className="flex">
        <HomeButton />
        <SavedItemCounter />
      </div>
      <button className="SaveButton" id={id} type="button">
        Save
      </button>
    </nav>
  );
}

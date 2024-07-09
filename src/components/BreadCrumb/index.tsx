"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getSavedAuthors,
  getSavedPublications,
  getSavedResources,
  subscribe,
  unsubscribe,
} from "~/utils/itemStorage";
import SaveButton from "../SaveButton";

const getCurrentCount = () =>
  getSavedAuthors().length +
  getSavedPublications().length +
  getSavedResources().length;

function SavedItemCounter() {
  const [count, setCount] = useState(getCurrentCount());

  useEffect(() => {
    const updateCount = () => {
      setCount(getCurrentCount());
    };
    subscribe("counter", updateCount);
    return () => {
      unsubscribe("counter");
    };
  }, []);

  return (
    <>
      {count > 0 && (
        <Link
          className="box-border flex h-7 flex-col justify-center rounded-lg border-0 bg-[#efefef] px-2.5 py-0 text-center font-bold text-[#6e6e6e] no-underline hover:shadow-yale"
          href="/pins"
          type="button"
        >
          {`${count} ${count === 1 ? "pin" : "pins"}`}
        </Link>
      )}
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
        Home
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
      <SaveButton
        className={{
          wrapper: "top-0",
          button: "rounded-lg",
        }}
        id={id}
        type={saveType}
      />
    </nav>
  );
}

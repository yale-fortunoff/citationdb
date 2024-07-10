"use client";

import { useEffect } from "react";

import useLocalDataStore from "~/store/local";
import useSessionDataStore from "~/store/session";

import authorJSON from "../../../public/data/author.json" assert { type: "json" };
import footnoteJSON from "../../../public/data/footnote.json" assert { type: "json" };
import publicationJSON from "../../../public/data/publication.json" assert { type: "json" };
import resourceJSON from "../../../public/data/resource.json" assert { type: "json" };

export default function Data() {
  const localData = useLocalDataStore();
  const sessionData = useSessionDataStore();

  useEffect(() => {
    if (sessionData.loaded) {
      return;
    }
    localData.setAuthors(
      Object.entries(authorJSON).map(([key, value]: [string, any]) => ({
        ...value,
        id: key,
        __header: value.name,
        __type: "author",
      })),
    );
    localData.setFootnotes(
      Object.entries(footnoteJSON).map(([key, value]: [string, any]) => ({
        ...value,
        id: key,
        __header: { id: value["publication.id"] },
        __type: "footnote",
      })),
    );
    localData.setPublications(
      Object.entries(publicationJSON).map(([key, value]: [string, any]) => ({
        ...value,
        id: key,
        __header: value.title,
        __type: "publication",
      })),
    );
    localData.setResources(
      Object.entries(resourceJSON).map(([key, value]: [string, any]) => ({
        ...value,
        id: key,
        __header: value.title,
        __type: "resource",
      })),
    );
    sessionData.setLoaded(true);
  }, [sessionData.loaded]);

  return <></>;
}

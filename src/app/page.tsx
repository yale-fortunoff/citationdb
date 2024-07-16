"use client";

import { useEffect, useState } from "react";

import PublicationHistogram from "~/components/PublicationHistogram";
import BigNumber from "~/components/BigNumber";
import SearchArea from "~/components/SearchArea";
import ResultList from "~/components/ResultList";
import TopWrapper from "~/components/TopWrapper";

import ResultListWrapper from "~/components/ResultListWrapper";
import { authors, publications, resources } from "~/utils/data";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [toggles, setToggles] = useState<{
    resource: boolean;
    publication: boolean;
    author: boolean;
  }>({ resource: false, publication: false, author: false });
  const [items, setItems] = useState<object[]>([]);
  const [counts, setCounts] = useState<{
    resource: number;
    publication: number;
    author: number;
  }>({
    resource: 0,
    publication: 0,
    author: 0,
  });

  const toggleFactory = (label: "resource" | "publication" | "author") => {
    return () => {
      setToggles((prev) => ({ ...prev, [label]: !prev[label] }));
    };
  };

  useEffect(() => {
    setToggles({ resource: true, publication: true, author: true });
  }, []);

  useEffect(() => {
    let filteredAuthors = [];
    let filteredPublications = [];
    let filteredResources = [];
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    if (toggles.author) {
      filteredAuthors = authors.filter((a) =>
        a.__header?.toLowerCase().includes(trimmedSearchTerm),
      );
    }
    if (toggles.publication) {
      filteredPublications = publications.filter((p) =>
        p.__header?.toLowerCase().includes(trimmedSearchTerm),
      );
    }
    if (toggles.resource) {
      filteredResources = resources.filter((r) =>
        r.__header?.toLowerCase().includes(trimmedSearchTerm),
      );
    }
    setItems(
      [...filteredAuthors, ...filteredPublications, ...filteredResources].sort(
        (a, b) => (a.__header > b.__header ? 1 : -1),
      ),
    );
    setCounts({
      resource: filteredResources.length,
      author: filteredAuthors.length,
      publication: filteredPublications.length,
    });
  }, [searchTerm, toggles]);

  if (!items || !counts) {
    return;
  }

  return (
    <>
      <TopWrapper id={null} saveType="unknown">
        <div className="mx-4 mb-9 mt-4 flex-[2_1] md:mx-2.5">
          <PublicationHistogram items={items} />
        </div>
        <div className="flex max-w-none justify-center md:max-w-[350px] md:justify-end">
          <BigNumber
            className="border-[#f9be00]"
            label="testimonies"
            value={counts.resource}
          />
          <BigNumber
            className="border-[#0d99aa]"
            label="publications"
            value={counts.publication}
          />
          <BigNumber
            className="border-[#ca6251]"
            label="authors"
            value={counts.author}
          />
        </div>
      </TopWrapper>
      <SearchArea
        onChange={(e: any) => setSearchTerm(e.target.value)}
        value={searchTerm}
        toggles={Object.keys(toggles).map((t: string) => ({
          label: t + "s",
          handler: toggleFactory(t as "resource" | "publication" | "author"),
          status: toggles[t as "resource" | "publication" | "author"],
        }))}
      />
      <ResultListWrapper>
        <ResultList items={items} />
      </ResultListWrapper>
    </>
  );
}

"use client";

import { useState } from "react";

import BreadCrumb from "~/components/BreadCrumb";
import PublicationHistogram from "~/components/PublicationHistogram";
import BigNumber from "~/components/BigNumber";

import Data from "../data";
import SearchArea from "~/components/SearchArea";
import ResultList from "~/components/ResultList";

export default function HomePage(props: any) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [toggles, setToggles] = useState<{
    resource: boolean;
    publication: boolean;
    author: boolean;
  }>({ resource: true, publication: true, author: true });

  const toggleFactory = (label: "resource" | "publication" | "author") => {
    return () => {
      setToggles((prev) => ({ ...prev, [label]: !prev[label] }));
    };
  };

  const items = Data.search({ searchTerm, toggles });
  const counts = Data.summarize.countByType(items);

  return (
    <div className="HomePage">
      <div className="top-matter-wrapper">
        <div className="top-matter-inner column-wrapper">
          <BreadCrumb id={null} />
          <section className="top-matter">
            <div className="left">
              <PublicationHistogram items={items} />
            </div>
            <div className="right">
              <div className="bignumber-tray">
                <BigNumber label="testimonies" value={counts.resource} />
                <BigNumber label="publications" value={counts.publication} />
                <BigNumber label="authors" value={counts.author} />
              </div>
            </div>
          </section>
        </div>
      </div>
      <SearchArea
        onChange={setSearchTerm}
        value={searchTerm}
        toggles={Object.keys(toggles).map((t: string, i: number) => {
          return {
            label: t + "s",
            handler: toggleFactory(t as "resource" | "publication" | "author"),
            status: toggles[t as "resource" | "publication" | "author"],
          };
        })}
      />
      {/* <section className="column-wrapper">
        <ResultList items={items}></ResultList>
      </section> */}
    </div>
  );
}

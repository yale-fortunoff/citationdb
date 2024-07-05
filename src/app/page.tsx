"use client";

import { useState } from "react";

import BreadCrumb from "~/components/BreadCrumb";
import PublicationHistogram from "~/components/PublicationHistogram";
import BigNumber from "~/components/BigNumber";

import Data from "../data";
import SearchArea from "~/components/SearchArea";
import ResultList from "~/components/ResultList";
import SiteBanner from "~/components/SiteBanner";

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
    <>
      <SiteBanner />

      <div className="HomePage">
        <div className="box-border w-full max-w-none bg-white px-2.5 py-10">
          <div className="relative mx-auto w-4/5 max-w-[1200px]">
            <BreadCrumb id={null} />
            <section className=" mt-7 flex flex-wrap">
              <div className="mx-2.5 flex-[2_1]">
                <PublicationHistogram items={items} />
              </div>
              <div className="flex max-w-[350px] justify-end">
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
            </section>
          </div>
        </div>
        <SearchArea
          onChange={setSearchTerm}
          value={searchTerm}
          toggles={Object.keys(toggles).map((t: string, i: number) => {
            return {
              label: t + "s",
              handler: toggleFactory(
                t as "resource" | "publication" | "author",
              ),
              status: toggles[t as "resource" | "publication" | "author"],
            };
          })}
        />
        {/* <section className="column-wrapper">
        <ResultList items={items}></ResultList>
      </section> */}
      </div>
    </>
  );
}

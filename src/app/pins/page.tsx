"use client";

import React, { useEffect, useState } from "react";

import BigNumber from "~/components/BigNumber";
import BreadCrumb from "~/components/BreadCrumb";
import ResultList from "~/components/ResultList";
import SiteBanner from "~/components/SiteBanner";
import {
  getSavedAuthors,
  getSavedPublications,
  getSavedResources,
  subscribe,
  unsubscribe,
} from "~/utils/itemStorage";

const getCounts = () => ({
  publications: getSavedPublications(),
  authors: getSavedAuthors(),
  resources: getSavedResources(),
});

export default function PinsPage(props: any) {
  const [data, setData] = useState<{
    publications: any[];
    authors: any[];
    resources: any[];
  }>(getCounts());

  useEffect(() => {
    const updateCounts = () => {
      setData(getCounts());
    };
    subscribe("saved-items-page", updateCounts);
    return () => {
      unsubscribe("saved-items-page");
    };
  }, []);

  return (
    <>
      <SiteBanner />
      <div className="w-full bg-white px-2.5 py-10">
        <div className="relative mx-auto w-4/5 max-w-[1200px]">
          <BreadCrumb />
          <section className="mt-7 md:flex">
            <div className="md:flex[2_1] m-5 md:mx-2">
              <h1 className="m-0 p-0 font-yalenewroman text-xl font-normal">
                Your pinned items
              </h1>
              <p>
                These items are stored temporarily in your browser. They will
                not be saved after you close the browser window or tab.
              </p>
            </div>
            <div className="md:max-w-[350px]">
              <div className="flex justify-end">
                <BigNumber
                  className="border-[#f9be00]"
                  label={
                    data.resources.length === 1 ? "testimony" : "testimonies"
                  }
                  value={data.resources.length}
                />
                <BigNumber
                  className="border-[#0d99aa]"
                  label={
                    data.publications.length === 1
                      ? "publication"
                      : "publications"
                  }
                  value={data.publications.length}
                />
                <BigNumber
                  className="border-[#ca6251]"
                  label={data.authors.length === 1 ? "author" : "authors"}
                  value={data.authors.length}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="relative mx-auto mt-7 w-4/5 max-w-[1200px]">
        <ResultList items={data.resources} />
        <ResultList items={data.publications} />
        <ResultList items={data.authors} />
      </section>
    </>
  );
}

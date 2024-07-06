import React from "react";

import Histogram from "~/components/Viz/Histogram";

import data from "../../data";

export default function PublicationsHistogram(props: any) {
  console.log("Asdf", props.items);
  const publicationData = data.summarize.yearCounts(
    props.items.filter((item: any) => item.__type === "publication"),
  ) as any[];

  console.log("DATA", publicationData);

  if (publicationData.length < 1) {
    return;
  }

  return (
    <div className="h-full max-h-[150px] w-full">
      <Histogram
        data={publicationData}
        minYear={1975}
        maxYear={new Date().getFullYear() + 1}
        margin={{
          top: 10,
          left: 30,
          right: 10,
          bottom: 20,
        }}
      />
      <h6 className="center">Publications by year</h6>
    </div>
  );
}

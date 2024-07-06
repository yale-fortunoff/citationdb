import React from "react";

import data from "~/data";
import Histogram from "~/components/Viz/Histogram";

export default function PublicationsHistogram(props: any) {
  const publicationData = data.summarize.yearCounts(
    props.items.filter((item: any) => item.__type === "publication"),
  ) as any[];

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

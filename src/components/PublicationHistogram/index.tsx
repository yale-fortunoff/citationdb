import React from "react";

import Histogram from "~/components/Viz/Histogram";
import { yearCounts } from "~/utils/data";

export default function PublicationsHistogram(props: any) {
  const publicationData = yearCounts(
    props.items.filter((item: any) => item.__type === "publication"),
  ) as any[];

  if (publicationData.length < 1) {
    return;
  }

  return (
    <div className="block h-full max-h-[150px] w-full">
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
      <h6 className="text-center text-xs font-bold text-[#222]">
        Publications by year
      </h6>
    </div>
  );
}

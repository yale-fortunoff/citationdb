import React from "react";
import { ResponsiveBar } from "@nivo/bar";

import Data from "../../data";

const dummyData = [
  {
    country: "AD",
    "hot dog": 105,
    "hot dogColor": "hsl(68, 70%, 50%)",
    burger: 138,
    burgerColor: "hsl(56, 70%, 50%)",
    sandwich: 8,
    sandwichColor: "hsl(304, 70%, 50%)",
    kebab: 53,
    kebabColor: "hsl(350, 70%, 50%)",
    fries: 129,
    friesColor: "hsl(256, 70%, 50%)",
    donut: 70,
    donutColor: "hsl(37, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 111,
    "hot dogColor": "hsl(247, 70%, 50%)",
    burger: 144,
    burgerColor: "hsl(43, 70%, 50%)",
    sandwich: 149,
    sandwichColor: "hsl(0, 70%, 50%)",
    kebab: 162,
    kebabColor: "hsl(241, 70%, 50%)",
    fries: 187,
    friesColor: "hsl(34, 70%, 50%)",
    donut: 115,
    donutColor: "hsl(223, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 146,
    "hot dogColor": "hsl(318, 70%, 50%)",
    burger: 71,
    burgerColor: "hsl(54, 70%, 50%)",
    sandwich: 78,
    sandwichColor: "hsl(348, 70%, 50%)",
    kebab: 187,
    kebabColor: "hsl(167, 70%, 50%)",
    fries: 19,
    friesColor: "hsl(72, 70%, 50%)",
    donut: 119,
    donutColor: "hsl(240, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 62,
    "hot dogColor": "hsl(338, 70%, 50%)",
    burger: 1,
    burgerColor: "hsl(186, 70%, 50%)",
    sandwich: 24,
    sandwichColor: "hsl(62, 70%, 50%)",
    kebab: 197,
    kebabColor: "hsl(22, 70%, 50%)",
    fries: 140,
    friesColor: "hsl(78, 70%, 50%)",
    donut: 101,
    donutColor: "hsl(286, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 56,
    "hot dogColor": "hsl(27, 70%, 50%)",
    burger: 147,
    burgerColor: "hsl(12, 70%, 50%)",
    sandwich: 157,
    sandwichColor: "hsl(39, 70%, 50%)",
    kebab: 154,
    kebabColor: "hsl(247, 70%, 50%)",
    fries: 86,
    friesColor: "hsl(221, 70%, 50%)",
    donut: 110,
    donutColor: "hsl(2, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 115,
    "hot dogColor": "hsl(157, 70%, 50%)",
    burger: 191,
    burgerColor: "hsl(176, 70%, 50%)",
    sandwich: 115,
    sandwichColor: "hsl(4, 70%, 50%)",
    kebab: 194,
    kebabColor: "hsl(157, 70%, 50%)",
    fries: 64,
    friesColor: "hsl(45, 70%, 50%)",
    donut: 175,
    donutColor: "hsl(216, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 79,
    "hot dogColor": "hsl(78, 70%, 50%)",
    burger: 181,
    burgerColor: "hsl(333, 70%, 50%)",
    sandwich: 128,
    sandwichColor: "hsl(58, 70%, 50%)",
    kebab: 170,
    kebabColor: "hsl(275, 70%, 50%)",
    fries: 96,
    friesColor: "hsl(228, 70%, 50%)",
    donut: 118,
    donutColor: "hsl(195, 70%, 50%)",
  },
];

export default function PublicationsHistogram(props: any) {
  const data = Data.summarize.yearCounts(
    props.items.filter((item: any) => item.__type === "publication"),
  ) as any[];

  if (data.length < 1) {
    return;
  }

  console.log("OAKWDOKAWD", data);

  return (
    <div className="PublicationHistogram">
      <ResponsiveBar data={dummyData} />
      {/* <Histogram
        data={data}
        minYear={histogramConfig.minYear}
        maxYear={histogramConfig.maxYear}
        margin={{
          top: 10,
          left: 30,
          right: 10,
          bottom: 20,
        }}
      /> */}
      <h6 className="center">Publications by year</h6>
    </div>
  );
}

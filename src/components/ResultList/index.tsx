import React, { useEffect, useState } from "react";
import ResultListItem from "./ResultListItem";

export default function ResultsList(props: any) {
  const [options, setOptions] = useState<{ itemCount: number; step: number }>({
    itemCount: 25,
    step: 10,
  });

  useEffect(() => {
    const trackScrolling = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const distanceFromBottom =
        window.document.body.offsetHeight - scrollBottom;
      if (props.items.length > options.itemCount && distanceFromBottom < 100) {
        loadMore();
      }
    };
    document.addEventListener("scroll", trackScrolling);
    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, []);

  const loadMore = () => {
    const itemCount = options.itemCount + options.step;
    setOptions((prev) => ({ ...prev, itemCount }));
  };

  const items = props.items
    .sort((a: any, b: any) => {
      return a.__header > b.__header ? 1 : -1;
    })
    .map((x: any, i: number) => {
      return (
        <ResultListItem key={i} item={x} type={x.__type} header={x.__header} />
      );
    })
    .slice(0, options.itemCount);

  return <div className="ResultList">{items}</div>;
}

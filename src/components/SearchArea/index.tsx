import React from "react";
import pluralize from "pluralize";

import TextInput from "../TextInput";
import ToggleButton from "../ToggleButton";

import wordsConfig from "~/configs/words";

export default function SearchArea(props: any) {
  return (
    <div>
      <section className="relative mx-auto mt-7 w-4/5 max-w-[1200px]">
        <TextInput
          onChange={props.onChange}
          value={props.value}
          placeholder={`Search by author, publication title or ${wordsConfig.resource.singular}...`}
        />
      </section>
      <section className="relative mx-auto mt-7 flex w-4/5 max-w-[1200px] items-center justify-center">
        {props.toggles.map((t: any, i: number) => {
          let label = t.label;
          const wordsKey = pluralize(label, 1);
          if (wordsConfig.hasOwnProperty(wordsKey)) {
            label = (wordsConfig as any)[wordsKey].plural;
          }

          let className = "";
          switch (label) {
            case "testimonies":
              className += "bg-[#f9be00]";
              break;
            case "publications":
              className += "bg-[#0d99aa]";
              break;
            case "authors":
              className += "bg-[#ca6251]";
              break;
          }

          return (
            <ToggleButton
              key={i}
              handleClick={t.handler}
              label={label}
              status={t.status}
              className={className}
            />
          );
        })}
      </section>
    </div>
  );
}

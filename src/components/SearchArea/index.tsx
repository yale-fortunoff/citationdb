import React from "react";
import pluralize from "pluralize";

import TextInput from "../TextInput";
import ToggleButton from "../ToggleButton";

import wordsConfig from "~/configs/words";

export default function SearchArea(props: any) {
  return (
    <div>
      <section className="SearchArea column-wrapper">
        <TextInput
          onChange={props.onChange}
          value={props.value}
          placeholder={`Search by author, publication title or ${wordsConfig.resource.singular}...`}
        />
      </section>
      <section className="toggle-box column-wrapper">
        <div className="label"></div>
        {props.toggles.map((t: any, i: number) => {
          let label = t.label;
          const wordsKey = pluralize(label, 1);
          if (wordsConfig.hasOwnProperty(wordsKey)) {
            label = (wordsConfig as any)[wordsKey].plural;
          }

          return (
            <ToggleButton
              key={i}
              handleClick={t.handler}
              label={label}
              itemType={t.label}
              status={t.status}
            />
          );
        })}
      </section>
    </div>
  );
}

import React from "react";
import { dropdownList } from "../../common/constants";
import { CurrentInput, Option, TagInput } from "../../types/types";
import Autocomplete from "../Autocomplete/Autocomplete";

import styles from "./AutocompleteBar.module.css";

type AutocompleteBarProps = {
  options: Option;
  currentInput: CurrentInput;
  setCurrentInput: React.Dispatch<React.SetStateAction<CurrentInput>>;
  tagInput: TagInput;
  setTagInput: React.Dispatch<React.SetStateAction<TagInput>>;
};

export default function AutocompleteBar(props: AutocompleteBarProps) {
  return (
    <section className={styles.AutocompleteBar}>
      {dropdownList.map((item, index) => (
        <Autocomplete
          {...props}
          key={index}
          suggestions={props.options[item.value as keyof typeof props.options]}
          title={item.title}
          value={item.value}
          variant={item.variant}
        />
      ))}
    </section>
  );
}

import React, { useState } from "react";
import { tagsList } from "../../common/constants";
import {
  SearchTagTerm,
  TagOptions,
  SelectedTags,
  ShowAll,
} from "../../types/types";
import Autocomplete from "../Autocomplete/Autocomplete";

import styles from "./AutocompleteBar.module.css";

type AutocompleteBarProps = {
  tagOptions: TagOptions;
  searchTagTerm: SearchTagTerm;
  setSearchTagTerm: React.Dispatch<React.SetStateAction<SearchTagTerm>>;
  selectedTags: SelectedTags;
  setSelectedTags: React.Dispatch<React.SetStateAction<SelectedTags>>;
};

export default function AutocompleteBar(props: AutocompleteBarProps) {
  const [showAll, setShowAll] = useState<ShowAll>({
    ingredients: false,
    appliances: false,
    ustensils: false,
  });

  return (
    <section className={styles.AutocompleteBar}>
      {tagsList.map((item, index) => (
        <Autocomplete
          {...props}
          key={index}
          suggestions={
            props.tagOptions[item.value as keyof typeof props.tagOptions]
          }
          plural={item.plural}
          singular={item.singular}
          value={item.value}
          color={item.color}
          showAll={showAll}
          setShowAll={setShowAll}
        />
      ))}
    </section>
  );
}

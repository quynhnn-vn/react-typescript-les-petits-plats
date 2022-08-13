import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";

import SuggestionPopover from "../SuggestionPopover/SuggestionPopover";
import SuggestionAllPopover from "../SuggestionAllPopover/SuggestionAllPopover";

import { SearchTagTerm, SelectedTags, ShowAll } from "../../types/types";
import downArrowIcon from "../../assets/downArrow.svg";
import upArrowIcon from "../../assets/upArrow.svg";

import styles from "./Autocomplete.module.css";
import { removeDuplicate } from "../../common/utils";

export type AutocompleteProps = {
  suggestions: string[];
  plural: string;
  singular: string;
  value: string;
  color: string;
  searchTagTerm: SearchTagTerm;
  setSearchTagTerm: React.Dispatch<React.SetStateAction<SearchTagTerm>>;
  selectedTags: SelectedTags;
  setSelectedTags: React.Dispatch<React.SetStateAction<SelectedTags>>;
  showAll: ShowAll;
  setShowAll: React.Dispatch<React.SetStateAction<ShowAll>>;
};

export default function Autocomplete(props: AutocompleteProps) {
  const {
    suggestions,
    plural,
    singular,
    value,
    color,
    searchTagTerm,
    setSearchTagTerm,
    selectedTags,
    setSelectedTags,
    showAll,
    setShowAll,
  } = props;

  const [filteredSuggestions, setFilteredSuggestions] =
    useState<string[]>(suggestions);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const target = useRef<HTMLInputElement>(null!);

  const changeShowAll = () => {
    const newShowAll = Object.keys(showAll).reduce((result, k) => {
      return { ...result, [k]: value === k };
    }, {} as ShowAll);
    setShowAll(newShowAll);
  };

  const onChangeSearchTagTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eValue = e.target.value;
    const eName = e.target.name;
    setSearchTagTerm({
      ...searchTagTerm,
      [eName as keyof SearchTagTerm]: eValue,
    });

    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(eValue.toLowerCase()) !== -1
    );

    if (filtered.length > 0) {
      setShowAll({
        ...showAll,
        [value as keyof ShowAll]: false,
      });
    }

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const onFormClick = () => {
    setFilteredSuggestions(suggestions);
    changeShowAll();
  };

  const onClickSuggestion = (
    e: React.MouseEvent<HTMLLIElement>,
    name: string
  ): void => {
    setSearchTagTerm({
      ...searchTagTerm,
      [name as keyof SearchTagTerm]: "",
    });
    setSelectedTags({
      ...selectedTags,
      [name as keyof SelectedTags]: removeDuplicate([
        ...selectedTags[name as keyof SelectedTags],
        e.currentTarget.innerText,
      ]),
    });
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const onClickShowAll = () => {
    changeShowAll();
  };

  return (
    <div
      className={styles.Form}
      style={{
        width: showAll[value as keyof ShowAll] ? "calc(100%/3)" : "max-content",
      }}
    >
      <Form.Control
        type="text"
        name={value}
        placeholder={
          showAll[value as keyof ShowAll]
            ? `Rechercher un ${singular}`
            : plural.replace(/\w/, (firstLetter) => firstLetter.toUpperCase())
        }
        ref={target}
        value={searchTagTerm[value as keyof typeof searchTagTerm]}
        onChange={onChangeSearchTagTerm}
        onClick={onFormClick}
        autoComplete="off"
        style={{
          background: color,
          width: showAll[value as keyof ShowAll] ? "667px" : "170px",
        }}
      />
      <button className={styles.ArrowBtn} onClick={onClickShowAll}>
        <img
          className={styles.ArrowIcon}
          src={!showAll[value as keyof ShowAll] ? downArrowIcon : upArrowIcon}
          alt="Arrow"
        />
      </button>
      <SuggestionPopover
        currentTarget={target ? target.current : null}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        filteredSuggestions={filteredSuggestions}
        onClick={onClickSuggestion}
        {...props}
      />
      <SuggestionAllPopover
        currentTarget={target ? target.current : null}
        filteredSuggestions={filteredSuggestions}
        onClick={onClickSuggestion}
        {...props}
      />
    </div>
  );
}

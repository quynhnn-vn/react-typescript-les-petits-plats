import React, { useState, useRef, ReactElement } from "react";
import { Form, Popover, Overlay } from "react-bootstrap";
import { CurrentInput, TagInput } from "../../types/types";
import downArrowIcon from "../../assets/downArrow.svg";
import upArrowIcon from "../../assets/upArrow.svg";

import styles from "./Autocomplete.module.css";
import SuggestionPopover from "../SuggestionPopover/SuggestionPopover";

export type AutocompleteProps = {
  suggestions: string[];
  title: string;
  value: string;
  variant: string;
  currentInput: CurrentInput;
  setCurrentInput: React.Dispatch<React.SetStateAction<CurrentInput>>;
  tagInput: TagInput;
  setTagInput: React.Dispatch<React.SetStateAction<TagInput>>;
};

export default function Autocomplete(props: AutocompleteProps) {
  const {
    suggestions,
    title,
    value,
    variant,
    currentInput,
    setCurrentInput,
    tagInput,
    setTagInput,
  } = props;

  const [filteredSuggestions, setFilteredSuggestions] =
    useState<string[]>(suggestions);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);
  const target = useRef<HTMLInputElement>(null!);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCurrentInput({
      ...currentInput,
      [name as keyof CurrentInput]: value,
    });

    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const name = e.target.name;

    // User pressed the enter key
    if (e.key === "Enter") {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setCurrentInput({
        ...currentInput,
        [name as keyof CurrentInput]: filteredSuggestions[activeSuggestion],
      });
    }

    // User pressed the up arrow
    else if (e.key === "ArrowUp") {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }

    // User pressed the down arrow
    else if (e.key === "ArrowDown") {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const onFormClick = () => {
    setFilteredSuggestions(suggestions);
    setShowSuggestions(true);
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement>, name: string): void => {
    setCurrentInput({
      ...currentInput,
      [name as keyof CurrentInput]: "",
    });
    setTagInput({
      ...tagInput,
      [name as keyof TagInput]: [
        ...tagInput[name as keyof TagInput],
        e.currentTarget.innerText,
      ],
    });
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const allList = (
    <ul className={[styles.Suggestions, styles.AllSuggestions].join(" ")}>
      {suggestions
        .sort((a, b) => (a < b ? -1 : 1))
        .map((suggestion, index) => (
          <li key={index} onClick={(e) => onClick(e, value)}>
            {suggestion}
          </li>
        ))}
    </ul>
  );

  const allPopover = (
    <Overlay
      target={target.current}
      show={showAll}
      placement="bottom-start"
      rootClose
      onHide={() => {
        setShowAll(false);
      }}
      transition={true}
    >
      <Popover
        id="all"
        className={styles.AllPopover}
        style={{
          background: variant,
        }}
      >
        {allList}
      </Popover>
    </Overlay>
  );

  return (
    <div
      className={styles.Form}
      style={{
        background: variant,
        width: showAll ? "667px" : "170px",
      }}
    >
      <Form.Control
        type="text"
        name={value}
        placeholder={showAll ? `Rechercher un ${title}` : title}
        ref={target}
        value={currentInput[value as keyof typeof currentInput]}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={onFormClick}
        autoComplete="off"
        style={{
          borderRadius: !showSuggestions && !showAll ? "5px" : "5px 5px 0 0",
          width: showAll ? "667px" : "170px",
        }}
      />
      <button className={styles.ArrowBtn} onClick={() => setShowAll(!showAll)}>
        <img
          className={styles.ArrowIcon}
          src={!showAll ? downArrowIcon : upArrowIcon}
          alt="Arrow"
        />
      </button>
      <SuggestionPopover
        currentTarget={target ? target.current : null}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        filteredSuggestions={filteredSuggestions}
        activeSuggestion={activeSuggestion}
        onClick={onClick}
        {...props}
      />
      {allPopover}
    </div>
  );
}

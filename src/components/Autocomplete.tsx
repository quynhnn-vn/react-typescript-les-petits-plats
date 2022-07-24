import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { CurrentInput } from "./Recipes";

import "./Autocomplete.css";

type AutocompleteProps = {
  suggestions: string[];
  title: string;
  value: string;
  currentInput: CurrentInput;
  setCurrentInput: React.Dispatch<React.SetStateAction<CurrentInput>>;
};

export default function Autocomplete(props: AutocompleteProps) {
  const { suggestions, title, value, currentInput, setCurrentInput } = props;

  const [filteredSuggestions, setFilteredSuggestions] =
    useState<string[]>(suggestions);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

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

  const onClick = (e: React.MouseEvent<HTMLLIElement>, name: string) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setCurrentInput({
      ...currentInput,
      [name as keyof CurrentInput]: e.currentTarget.innerText,
    });
  };

  let suggestionsListComponent;

  if (showSuggestions && currentInput[value as keyof CurrentInput]) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion: string, index: number) => {
            let className: string = "";

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li
                className={className}
                key={suggestion}
                onClick={(e) => onClick(e, value)}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }

  return (
    <>
      <Form.Control
        type="text"
        name={value}
        placeholder={title}
        value={currentInput[title as keyof typeof currentInput]}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={onFormClick}
      />
      {suggestionsListComponent}
    </>
  );
}

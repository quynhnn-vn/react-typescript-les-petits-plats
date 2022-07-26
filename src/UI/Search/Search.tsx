import React from "react";

import { Form } from "react-bootstrap";
import searchIcon from "../../assets/search.svg";

import styles from "./Search.module.css";

type SearchProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search(props: SearchProps) {
  const { searchTerm, setSearchTerm } = props;

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className={styles.SearchBar}>
      <Form.Control
        type="text"
        id="search"
        placeholder="Rechercher une recette"
        value={searchTerm}
        onChange={onChangeSearch}
        className={styles.SearchTerm}
        autoComplete="off"
      />
      <img className={styles.SearchIcon} src={searchIcon} alt="Rechercher" />
    </section>
  );
}

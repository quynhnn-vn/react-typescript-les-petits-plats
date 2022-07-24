import React, { useEffect, useState } from "react";
import { Form, Row, Card, Col } from "react-bootstrap";

import { recipes } from "../assets/recipes";
import icon from "../assets/icon.svg";
import searchIcon from "../assets/search.svg";
import clockIcon from "../assets/clock.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Recipes.module.css";
import Autocomplete from "./Autocomplete";
import { removeDuplicate } from "../utils";

type Option = {
  ingredients: string[];
  appliances: string[];
  ustensils: string[];
};

type Ingredient = {
  ingredient: string;
  quantity?: string | number;
  unit?: string;
};

type Recipe = {
  appliance: string;
  description: string;
  id: number;
  ingredients: Ingredient[];
  name: string;
  servings: number;
  time: number;
  ustensils: string[];
};

export type CurrentInput = {
  ingredients: string;
  appliances: string;
  ustensils: string;
};

export default function Recipes() {
  const [globalTerm, setGlobalTerm] = useState<string>("");

  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [options, setOptions] = useState<Option>();

  const [currentInput, setCurrentInput] = useState<CurrentInput>({
    ingredients: "",
    appliances: "",
    ustensils: "",
  });

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalTerm(e.target.value);
  };

  useEffect(() => {
    if (recipes.length) {
      let ingredientOptions: string[][] = [],
        applianceOptions: string[] = [],
        ustensilOptions: string[][] = [];

      recipes.forEach((recipe: Recipe) => {
        ingredientOptions.push(
          recipe.ingredients.map((i) => i.ingredient).flat()
        );
        applianceOptions.push(recipe.appliance);
        ustensilOptions.push(recipe.ustensils.flat());
      });

      console.log("ingredientOptions", ingredientOptions.flat());

      setOptions({
        ingredients: removeDuplicate(ingredientOptions.flat()),
        appliances: removeDuplicate(applianceOptions.flat()),
        ustensils: removeDuplicate(ustensilOptions.flat()),
      });
    }
  }, []);

  const dropdownList = [
    {
      title: "Ingredients",
      variant: "primary",
      value: "ingredients",
    },
    {
      title: "Appareils",
      variant: "success",
      value: "appliances",
    },
    {
      title: "Ustensiles",
      variant: "danger",
      value: "ustensils",
    },
  ];

  return (
    <>
      <header>
        <img src={icon} alt="Les petits plats" />
        <h1>Les petits plats</h1>
      </header>
      <main>
        <section className={styles.SearchBar}>
          <Form.Control
            type="text"
            id="searchTerm"
            placeholder="Rechercher une recette"
            value={globalTerm}
            onChange={onChangeSearch}
            className={styles.SearchTerm}
          />
          <img
            className={styles.SearchIcon}
            src={searchIcon}
            alt="Rechercher"
          />
        </section>
        <section className={styles.DropdownBar}>
          {options &&
            dropdownList.map((item, index) => (
              <Autocomplete
                key={index}
                suggestions={options[item.value as keyof typeof options]}
                title={item.title}
                value={item.value}
                currentInput={currentInput}
                setCurrentInput={setCurrentInput}
              />
            ))}
        </section>
        <section className={styles.RecipesList}>
          <Row xs={2} md={3} className="g-5">
            {filteredRecipes.map((recipe, index) => (
              <Col>
                <Card className={styles.RecipeContainer}>
                  <Card.Img
                    variant="top"
                    src="/"
                    alt="Recipe"
                    className={styles.RecipeImg}
                  />
                  <Card.Body>
                    <Card.Title className={styles.RecipeTitle}>
                      <span>{recipe.name}</span>
                      <span>
                        <img
                          className={styles.ClockIcon}
                          src={clockIcon}
                          alt="Clock"
                        />
                        {`${recipe.time} min`}
                      </span>
                    </Card.Title>
                    <Card.Text className={styles.RecipeText}>
                      <div className={styles.RecipeContent}>
                        {recipe.ingredients.map((ingredientItem) => (
                          <p>
                            {ingredientItem.ingredient}{" "}
                            {ingredientItem.unit &&
                              `: ${ingredientItem?.quantity} ${ingredientItem.unit}`}
                          </p>
                        ))}
                      </div>
                      <p className={styles.RecipeContent}>
                        {recipe.description}
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </main>
    </>
  );
}

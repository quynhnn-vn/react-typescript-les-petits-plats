import React from "react";
import { FormattedRecipe } from "../../types/types";
import { Row, Col } from "react-bootstrap";

import styles from "./RecipeList.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";

type RecipeListProps = {
  filteredRecipes: FormattedRecipe[];
};

export default function RecipeList(props: RecipeListProps) {
  const { filteredRecipes } = props;
  return (
    <section className={styles.RecipesList}>
      <Row xs={2} md={3} className="g-5">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <Col key={index}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))
        ) : (
          <Col>
            Aucune recette ne correspond à votre critère… vous pouvez chercher «
            tarte aux pommes », « poisson »
          </Col>
        )}
      </Row>
    </section>
  );
}

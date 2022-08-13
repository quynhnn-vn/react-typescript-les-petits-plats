import React, { useState } from "react";

import { Card } from "react-bootstrap";
import { FormattedRecipe } from "../../types/types";
import clockIcon from "../../assets/clock.svg";
import backgroundImg from "../../assets/background.png";

import styles from "./RecipeCard.module.css";
import RecipeModal from "../RecipeModal/RecipeModal";

type RecipeCardProps = {
  recipe: FormattedRecipe;
};

export default function RecipeCard(props: RecipeCardProps) {
  const { recipe } = props;

  const [showDetails, setShowDetails] = useState<boolean>(false);

  const onShowDetails = () => setShowDetails(true);

  return (
    <>
      <Card className={styles.RecipeContainer} onClick={onShowDetails}>
        <Card.Img
          variant="top"
          src={backgroundImg}
          alt="Recipe"
          className={styles.RecipeImg}
        />
        <Card.Header className={styles.RecipeTitle}>
          <span>{recipe.name}</span>
          <span>
            <img className={styles.ClockIcon} src={clockIcon} alt="Clock" />
            {`${recipe.time} min`}
          </span>
        </Card.Header>
        <Card.Body className={styles.RecipeText}>
          <div>
            {recipe.ingredients.map((ingredientItem, index) => (
              <p key={index}>
                {ingredientItem.ingredient}{" "}
                {ingredientItem.unit &&
                  `: ${ingredientItem?.quantity} ${ingredientItem.unit}`}
              </p>
            ))}
          </div>
          <p className={styles.RecipeContent}>{recipe.description}</p>
        </Card.Body>
      </Card>
      <RecipeModal
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        recipe={recipe}
      />
    </>
  );
}

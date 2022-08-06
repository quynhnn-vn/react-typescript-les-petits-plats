import React from "react";

import { Modal, Card } from "react-bootstrap";
import backgroundImg from "../../assets/background.png";
import { FormattedRecipe } from "../../types/types";
import clockIcon from "../../assets/clock.svg";

import styles from "./RecipeModal.module.css";

type RecipeModalProps = {
  showDetails: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  recipe: FormattedRecipe;
};

export default function RecipeModal(props: RecipeModalProps) {
  const { showDetails, setShowDetails, recipe } = props;

  const onClose = () => setShowDetails(false);

  let content = [];
  if (recipe.ingredients && recipe.ingredients.length) {
    for (let index = 0; index < recipe.ingredients.length; index++) {
      const ingredientItem = recipe.ingredients[index];
      content.push(
        <p key={index}>
          {ingredientItem.ingredient}{" "}
          {ingredientItem.unit &&
            `: ${ingredientItem?.quantity} ${ingredientItem.unit}`}
        </p>
      );
    }
  }

  return (
    <Modal show={showDetails} onHide={onClose}>
      <Modal.Body>
        <Card>
          <Card.Img
            variant="top"
            src={backgroundImg}
            alt="Recipe"
            className={styles.RecipeImg}
          />
          <Card.Header className={styles.RecipeTitle}>
            <span>{recipe?.name}</span>
            <span>
              <img className={styles.ClockIcon} src={clockIcon} alt="Clock" />
              {`${recipe.time} min`}
            </span>
          </Card.Header>
          <Card.Body className={styles.RecipeText}>
            <div className={styles.RecipeContent}>{content}</div>
            <p className={styles.RecipeContent}>{recipe.description}</p>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

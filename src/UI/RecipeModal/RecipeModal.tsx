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
            <div className={styles.RecipeContent}>
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
      </Modal.Body>
    </Modal>
  );
}

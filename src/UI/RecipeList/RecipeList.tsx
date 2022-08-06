import { FormattedRecipe, SelectedTags } from "../../types/types";
import { Row, Col } from "react-bootstrap";

import styles from "./RecipeList.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";

type RecipeListProps = {
  filteredRecipes: FormattedRecipe[];
  searchTerm: string;
  selectedTags: SelectedTags;
};

export default function RecipeList(props: RecipeListProps) {
  const { filteredRecipes, searchTerm, selectedTags } = props;

  let content = [];
  if (filteredRecipes && filteredRecipes.length) {
    for (let index = 0; index < filteredRecipes.length; index++) {
      content.push(
        <Col key={index}>
          <RecipeCard recipe={filteredRecipes[index]} />
        </Col>
      );
    }
  }

  return (
    <section className={styles.RecipesList}>
      {filteredRecipes.length > 0 ? (
        <Row xs={1} md={3} className="g-5">
          {content}
        </Row>
      ) : (
        <div className={styles.EmptyList}>
          Aucune recette ne correspond à votre critère{" "}
          <strong>
            {[searchTerm, ...Object.values(selectedTags).flat()].join(" ")}
          </strong>
          . Vous pouvez chercher « tarte aux pommes », « poisson »
        </div>
      )}
    </section>
  );
}

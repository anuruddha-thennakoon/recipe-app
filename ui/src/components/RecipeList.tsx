import React from "react";
import Recipe from "./Recipe";

interface RecipeProps {
  _id: string;
  name: string;
  ingredients: string[];
  measurements: string[];
  method: string[];
}

interface RecipeListProps {
  recipes: RecipeProps[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <>
      <div data-cy="recipelist">Recipe List</div>
      {recipes.length === 0 && <div data-cy="norecipe">No Recipes Found</div>}
      {recipes.map((recipe: Recipe) => (
        <Recipe key={recipe._id} recipe={recipe} />
      ))}
    </>
  );
};

export default RecipeList;

import React from "react";
import "./Recipe.css";

interface Recipe {
  _id: string;
  name: string;
  ingredients: string[];
  measurements: string[];
  method: string[];
}

interface RecipeProps {
  recipe: Recipe;
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <div className="recipe" data-cy="recipe">
      <div className="recipe__item" data-cy={`recipe-name${recipe._id}`}>
        <span>Name</span>
        {recipe.name}
      </div>
      <div className="recipe__item" data-cy={`recipe-ingredients${recipe._id}`}>
        <span>Ingredients</span> {recipe.ingredients.toString()}
      </div>
      <div
        className="recipe__item"
        data-cy={`recipe-measurements${recipe._id}`}
      >
        <span>Measurements</span> {recipe.measurements.toString()}
      </div>
      <div className="recipe__item" data-cy={`recipe-method${recipe._id}`}>
        <span>Method</span> {recipe.method.toString()}
      </div>
    </div>
  );
};

export default Recipe;

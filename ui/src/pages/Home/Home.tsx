import React, { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList";
import { fecthAllRecipes, fecthRecipeByName } from "../../utils/api";
import SearchBar from "../../components/SearchBar";

import "./home.css";
import { AddRecipe } from "../../components/AddRecipe";
interface Recipe {
  _id: string;
  name: string;
  ingredients: string[];
  measurements: string[];
  method: string[];
}

export const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async (): Promise<void> => {
    const response = await fecthAllRecipes();
    setRecipes(response);
  };

  const fetchRecipe = async (name: string): Promise<void> => {
    const response = await fecthRecipeByName(name);
    setRecipes(response);
  };

  return (
    <div className="container">
      <h1>Recipe App</h1>
      <SearchBar
        fetchAllRecipes={fetchRecipes}
        fetchRecipeByName={fetchRecipe}
      />
      <AddRecipe fetchAllRecipes={fetchRecipes} />
      <RecipeList recipes={recipes} />
    </div>
  );
};

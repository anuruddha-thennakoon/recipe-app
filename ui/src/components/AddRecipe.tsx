import React, { useState } from "react";
import "./AddRecipe.css";
import { saveRecipe } from "../utils/api";

interface AddRecipeProps {
  fetchAllRecipes: () => void;
}

export const AddRecipe: React.FC<AddRecipeProps> = ({ fetchAllRecipes }) => {
  const [open, setOpen] = useState(false);

  const [recipeName, setRecipeName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [measurements, setMeasurements] = useState<string>("");
  const [method, setMethod] = useState<string>("");

  const handleSave = () => {
    saveRecipe({
      name: recipeName,
      ingredients: ingredients.split(","),
      measurements: measurements.split(","),
      method: method.split(","),
    }).then((res) => {
      if (res) {
        fetchAllRecipes();
        setOpen(!open);
        setRecipeName("");
        setIngredients("");
        setMeasurements("");
        setMethod("");
      } else {
        alert("Something went wrong in adding recipe");
      }
    });
  };

  return (
    <div className="addrecipe__container">
      <div className={`modal ${open ? "show-modal" : ""}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setOpen(!open)}>
            &times;
          </span>
          <h3>Add Recipe</h3>
          <input
            type="text"
            placeholder="Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <p>Enter details in comma seperated</p>
          <input
            type="text"
            placeholder="Measurements"
            value={measurements}
            onChange={(e) => setMeasurements(e.target.value)}
          />
          <p>Enter details in comma seperated</p>
          <input
            type="text"
            placeholder="Method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
          <p>Enter details in comma seperated</p>

          <button onClick={handleSave}>Save</button>
        </div>
      </div>

      <button data-cy="clear" onClick={() => setOpen(!open)}>
        Add Recipe +
      </button>
    </div>
  );
};

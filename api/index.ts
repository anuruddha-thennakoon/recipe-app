import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import express, { Request, Response } from "express";
import { Recipe } from "./schemas/Recipe";

const app = express();

export class Application {
  constructor() {
    this.setupApplicationSettings();
    this.setupControllers();
  }

  setupApplicationSettings() {
    app.use(cors());
    app.use(urlencoded({ extended: false }));
    app.use(json());
  }

  listen() {
    app.listen(3080, () => console.log("Listening on port 3080"));
  }

  setupControllers() {
    app.get("/recipes", async (req: Request, res: Response) => {
      try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes" });
      }
    });
    app.get("/recipes/:name", async (req: Request, res: Response) => {
      try {
        const recipeName = req.params.name;
        const recipes = await Recipe.find({ name: recipeName });

        if (recipes.length === 0) {
          return res.status(404).json({ error: "No recipe found with the specified name" });
        }

        res.status(200).json(recipes);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch recipes by name" });
      }
    });
    app.post("/recipes", async (req: Request, res: Response) => {
      try {
        const { name, ingredients, measurements, method } = req.body;
        const recipe = new Recipe({ name, ingredients, measurements, method });
        const savedRecipe = await recipe.save();
        res.status(201).json(savedRecipe);
      } catch (error) {
        res.status(500).json({ error: "Failed to create a new recipe" });
      }
    });
    app.delete("/recipes/:id", async (req: Request, res: Response) => {
      try {
        const recipeId = req.params.id;
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        if (!deletedRecipe) {
          return res.status(404).json({ error: "Recipe not found" });
        }

        res.status(200).json(deletedRecipe);
      } catch (error) {
        res.status(500).json({ error: "Failed to delete recipe" });
      }
    });
    app;
  }
}

async function createDatabaseConnection() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/recipeapp");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

createDatabaseConnection().then(() => {
  const application = new Application();
  application.listen();
});

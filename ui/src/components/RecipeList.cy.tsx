import RecipeList from "./RecipeList";

interface Recipe {
  _id: string;
  name: string;
  ingredients: string[];
  measurements: string[];
  method: string[];
}

describe("RecipeList Component", () => {
  beforeEach(() => {
    const recipes: Recipe[] = [];
    cy.mount(<RecipeList recipes={recipes} />);
  });

  it("displays 'RecipeList' text", () => {
    cy.get('[data-cy="recipelist"]').should("contain", "Recipe List");
  });

  it("displays 'No recipes found' when no recipes are provided", () => {
    cy.get('[data-cy="norecipe"]').should("be.visible");
  });

  it("displays recipes when recipes are provided", () => {
    const recipes = [
      {
        _id: "64523e4f-1b0a-4f5b-9f4d-5a1f3c1a1a1a",
        name: "Chicken Soup",
        ingredients: ["chicken", "water", "salt", "pepper"],
        measurements: ["1 whole", "2 liters"],
        method: [
          "Put the chicken in a pot of water.",
          "Bring the water to a boil.",
          "Reduce the heat and simmer for 30 minutes.",
          "Shred the chicken and add it back to the pot.",
          "Serve hot.",
        ],
      },
      {
        _id: "64523e4f-1b0a-4f5b-9f4d-5a1f3c1a1a1b",
        name: "Beef Stew",
        ingredients: ["beef", "carrots", "potatoes", "onions", "celery"],
        measurements: ["1 pound", "1 cup"],
        method: [
          "Brown the beef in a large pot.",
          "Add the carrots, potatoes, onions, and celery to the pot.",
          "Add enough water to cover the ingredients.",
          "Bring the stew to a boil.",
          "Reduce the heat and simmer for 1 hour.",
          "Serve hot.",
        ],
      },
    ];
    cy.mount(<RecipeList recipes={recipes} />);
    cy.get('[data-cy="recipe"]').should("have.length", recipes.length);

    recipes.forEach((recipe) => {
      cy.get(`[data-cy=recipe-name${recipe._id}]`).should(
        "contain",
        recipe.name
      );
      cy.get(`[data-cy=recipe-ingredients${recipe._id}]`).should(
        "contain",
        recipe.ingredients.toString()
      );
      cy.get(`[data-cy=recipe-measurements${recipe._id}]`).should(
        "contain",
        recipe.measurements.toString()
      );
      cy.get(`[data-cy=recipe-method${recipe._id}]`).should(
        "contain",
        recipe.method.toString()
      );
    });
  });
});

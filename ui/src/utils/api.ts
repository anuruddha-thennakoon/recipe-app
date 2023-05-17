export const fecthAllRecipes = async () => {
    const response = await fetch("http://localhost:3080/recipes");
    const data = await response.json();
    if (data.error) {
        return [];
    }
    return data;
};

export const fecthRecipeByName = async (name: string) => {
    const response = await fetch(`http://localhost:3080/recipes/${name}`);
    const data = await response.json();
    if (data.error) {
        return [];
    }
    return data;
};

export const saveRecipe = async (reqObj: object) => {
    const response = await fetch("http://localhost:3080/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqObj),
    });
    const data = await response.json();
    if (data.error) {
        return false;
    }
    return true;
};
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    measurements: {
        type: [String],
        required: true,
    },
    method: {
        type: [String],
        required: true,
    },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export { Recipe };
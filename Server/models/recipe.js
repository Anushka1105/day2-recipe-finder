const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Recipe name is required"],
        trim: true,
        maxLength: [200, "Recipe name cannot be more than 200 characters"],
    },
    ingredients: {
        type: [String],
        required: true,
        default:[],
    },
    instructions: {
        type: String,
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    difficultyLevel: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
    },
    mealType: {
        type: String,
        enum: ["breakfast", "lunch", "dinner", "dessert"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    comments: {
        type: [
            {
                user: String,
                text: String,
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: []
    },
    nutrition: {
        type: {
            calories: Number,
            protein: Number,
            carbs: Number,
            fats: Number,
        }

    }

});

module.exports = mongoose.model("Recipe", recipeSchema);

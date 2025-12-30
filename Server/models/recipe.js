import mongoose from 'mongoose'

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
        default: [],
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
        totalStars: {
            type: Number,
            default: 0
        },
        totalUsers: {
            type: Number,
            default: 0
        }
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

export default mongoose.model('Recipe', recipeSchema)

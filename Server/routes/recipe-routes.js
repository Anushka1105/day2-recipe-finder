import express from 'express'
import {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from '../Controllers/recipe-controller.js'

// create router
const router = express.Router();

// Recipe routes
router.get("/get", getAllRecipes);
router.get("/get/:id", getRecipeById);
router.post("/add", addRecipe);
router.put("/update/:id", updateRecipe);
router.delete("/delete/:id", deleteRecipe);

export default router;

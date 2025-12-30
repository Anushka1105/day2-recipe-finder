import express from 'express'
import {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeByName,
  AddratingById,
} from '../Controllers/recipe-controller.js'

// create router
const router = express.Router();

// Recipe routes
router.get("/get", getAllRecipes);
router.get("/get/:id", getRecipeById);
router.post("/add", addRecipe);
router.put("/update/:id", updateRecipe);
router.delete("/delete/:id", deleteRecipe);
router.get("/get/recipe/:name", getRecipeByName);
router.post("/get/recipe/:id/rate", AddratingById);

export default router;

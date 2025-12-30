const express = require("express");
const {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../Controllers/recipe-controller");

// create router
const router = express.Router();

// Recipe routes
router.get("/get", getAllRecipes);
router.get("/get/:id", getRecipeById);
router.post("/add", addRecipe);
router.put("/update/:id", updateRecipe);
router.delete("/delete/:id", deleteRecipe);

module.exports = router;

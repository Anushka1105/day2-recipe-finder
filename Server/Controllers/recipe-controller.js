const Recipe = require("../models/recipe");

//getall recipe
const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find({});

    if (allRecipes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No recipes found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipes fetched successfully",
      data: allRecipes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//get recipe by id
const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found with this id",
      });
    }

    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// add recipe
const addRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);

    res.status(201).json({
      success: true,
      message: "Recipe added successfully",
      data: newRecipe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//update recipe
const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      req.body,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found with this id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: updatedRecipe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found with this id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
      data: deletedRecipe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};

import React, { useState } from "react";

const AddRecipe = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    ingredients: "",
    instructions: "",
    time: 0,
    difficulty: "",
    mealType: "",
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
  });

  // fields that must be numbers
  const numberFields = ["time", "calories", "protein", "carbohydrates", "fat"];

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: numberFields.includes(name) ? Number(value) : value,
    });
  };

  // submit form
const addRecipes = async (e) => {
  e.preventDefault();
  setLoading(true);

  const payload = {
    name: formData.name,
    image: formData.image,

    // convert string → array
    ingredients: formData.ingredients.split(",").map(i => i.trim()),

    instructions: formData.instructions,

    // rename fields
    cookingTime: formData.time,
    difficultyLevel: formData.difficulty,
    mealType: formData.mealType,

    // nest nutrition
    nutrition: {
      calories: formData.calories,
      protein: formData.protein,
      carbs: formData.carbohydrates,
      fats: formData.fat,
    },
  };

  try {
    const response = await fetch("http://localhost:5000/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      alert("Recipe added successfully!");
    }
  } catch (error) {
    console.error("Error adding recipe:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="center">
      <div className="add-recipe">
        <h1>Add New Recipe</h1>

        <form className="recipe-form" onSubmit={addRecipes}>
          <label>
            Recipe Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            Recipe Image URL:
            <input type="text" name="image" value={formData.image} onChange={handleChange} required />
          </label>

          <label>
            Ingredients:
            <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} required />
          </label>

          <label>
            Instructions:
            <input type="text" name="instructions" value={formData.instructions} onChange={handleChange} required />
          </label>

          <label>
            Total Time (minutes):
            <input type="number" name="time" value={formData.time} onChange={handleChange} required />
          </label>

          <label>
            Difficulty Level:
            <input type="text" name="difficulty" value={formData.difficulty} onChange={handleChange} required />
          </label>

          <label>
            Meal Type:
            <input type="text" name="mealType" value={formData.mealType} onChange={handleChange} required />
          </label>

          <h5>Nutrition</h5>

          <label>
            Calories:
            <input type="number" name="calories" value={formData.calories} onChange={handleChange} required />
          </label>

          <label>
            Protein (g):
            <input type="number" name="protein" value={formData.protein} onChange={handleChange} required />
          </label>

          <label>
            Carbohydrates (g):
            <input type="number" name="carbohydrates" value={formData.carbohydrates} onChange={handleChange} required />
          </label>

          <label>
            Fat (g):
            <input type="number" name="fat" value={formData.fat} onChange={handleChange} required />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;

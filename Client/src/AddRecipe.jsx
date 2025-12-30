import React from 'react'

const AddRecipe = () => {
  return (
    <div className="center">
        <div className='add-recipe'>
        <h1>Add New Recipe</h1>
        <form className='recipe-form'>
            <label>
                Recipe Name:
                <input type="text" name="name" required />
            </label>
            <label>
                Recipe Image:
                <input type="text" name="name" required />
            </label>
            <label>
                Ingredients:
                <input type="text" name="name" required />
            </label>
            <label>
                Instructions:
                <input type="text" name="name" required />
            </label>
            <label>
                Total Time:
                <input type="text" name="name" required />
            </label>
            <label>
                Difficulty Level:
                <input type="text" name="name" required />
            </label>
            <label>
                Meal Type:
                <input type="text" name="name" required />
            </label>
            <h5>Nutrition</h5>
            <label>
                Calories:
                <input type="text" name="calories" required />
            </label>
            <label>
                Protein:
                <input type="text" name="protein" required />
            </label>
            <label>
                Carbohydrates:
                <input type="text" name="carbohydrates" required />
            </label>
            <label>
                Fat:
                <input type="text" name="fat" required />
            </label>
            

            <button type="submit">Add Recipe</button>
        </form>
    </div>
    </div>
    
  )
}

export default AddRecipe
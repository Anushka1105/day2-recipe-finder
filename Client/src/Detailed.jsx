import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Detailed = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        fetchRecipeDetails()
    }, [id])

    const fetchRecipeDetails = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:5000/api/get/${id}`)
            const data = await response.json()
            if (data.success) {
                setRecipe(data.data)
            } else {
                alert('Recipe not found!')
                navigate('/')
            }
        } catch (error) {
            console.error('Error fetching recipe details:', error)
            alert('Error loading recipe')
            navigate('/')
        } finally {
            setLoading(false)
        }
    }

    const handleRatingSubmit = async () => {
        if (rating === 0) {
            alert('Please select a rating!')
            return
        }

        setSubmitting(true)
        try {
            const response = await fetch(`http://localhost:5000/api/get/recipe/${id}/rate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stars: rating })
            })

            const data = await response.json()
            
            if (response.ok) {
                alert(`Thank you! Rating submitted: ${data.averageRating} ⭐`)
                fetchRecipeDetails()
                setRating(0)
            } else {
                alert(data.message || 'Error submitting rating')
            }
        } catch (error) {
            console.error('Error submitting rating:', error)
            alert('Error submitting rating')
        } finally {
            setSubmitting(false)
        }
    }

    const calculateAverageRating = () => {
        if (!recipe || recipe.rating.totalUsers === 0) return 0
        return (recipe.rating.totalStars / recipe.rating.totalUsers).toFixed(1)
    }

    const goBack = () => {
        navigate('/')
    }

    if (loading) {
        return (
            <div className="loading-container">
                <h2>Loading recipe...</h2>
            </div>
        )
    }

    if (!recipe) {
        return (
            <div className="loading-container">
                <h2>Recipe not found</h2>
                <button onClick={goBack} className="back-btn">Go Back</button>
            </div>
        )
    }

    return (
        <div className='detailed-container'>
            <button onClick={goBack} className="back-button">
                ← Back to Recipes
            </button>
            
            <div className='content-wrapper'>
                <div className='left-section'>
                    <div className='recipe-image'>
                        <img 
                            src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"} 
                            alt={recipe.name} 
                        />
                    </div>
                    <h1 className='recipe-title'>{recipe.name}</h1>
                    
                    <div className='quick-info'>
                        <div className='info-badge'>
                            <span className='info-icon'>⏱️</span>
                            <div>
                                <p className='info-label'>Cooking Time</p>
                                <p className='info-value'>{recipe.cookingTime} min</p>
                            </div>
                        </div>
                        <div className='info-badge'>
                            <span className='info-icon'>📊</span>
                            <div>
                                <p className='info-label'>Difficulty</p>
                                <p className='info-value'>{recipe.difficultyLevel}</p>
                            </div>
                        </div>
                        <div className='info-badge'>
                            <span className='info-icon'>🍽️</span>
                            <div>
                                <p className='info-label'>Meal Type</p>
                                <p className='info-value'>{recipe.mealType}</p>
                            </div>
                        </div>
                    </div>

                    <div className='rating-card'>
                        <h3>Current Rating</h3>
                        <div className='current-rating'>
                            <span className='rating-big'>{calculateAverageRating()}</span>
                            <svg className='star-big' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(240,187,64,1)">
                                <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                            </svg>
                        </div>
                        <p className='rating-count'>Based on {recipe.rating.totalUsers} ratings</p>
                    </div>

                    <div className='rate-recipe'>
                        <h3>Rate This Recipe</h3>
                        <div className='star-rating'>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`star-interactive ${star <= (hoveredRating || rating) ? 'filled' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={star <= (hoveredRating || rating) ? "rgba(240,187,64,1)" : "rgba(200,200,200,1)"}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => setRating(star)}
                                >
                                    <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                                </svg>
                            ))}
                        </div>
                        <p className='rating-hint'>
                            {rating > 0 ? `You selected ${rating} star${rating > 1 ? 's' : ''}` : 'Click to rate'}
                        </p>
                        <button 
                            onClick={handleRatingSubmit} 
                            className='submit-rating-btn'
                            disabled={submitting || rating === 0}
                        >
                            {submitting ? 'Submitting...' : 'Submit Rating'}
                        </button>
                    </div>
                </div>

                <div className='right-section'>
                    <div className='section-block'>
                        <h2 className='section-title'>
                            <span className='title-icon'>🥘</span>
                            Ingredients
                        </h2>
                        <ul className="ingredients-list">
                            {recipe.ingredients.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='section-block'>
                        <h2 className='section-title'>
                            <span className='title-icon'>👨‍🍳</span>
                            Instructions
                        </h2>
                        <div className='instructions-text'>
                            {recipe.instructions}
                        </div>
                    </div>

                    {recipe.nutrition && (
                        <div className='section-block nutrition-section'>
                            <h2 className='section-title'>
                                <span className='title-icon'>📊</span>
                                Nutrition Information
                            </h2>
                            <div className='nutrition-grid'>
                                {recipe.nutrition.calories && (
                                    <div className='nutrition-item'>
                                        <span className='nutrition-label'>Calories</span>
                                        <span className='nutrition-value'>{recipe.nutrition.calories} kcal</span>
                                    </div>
                                )}
                                {recipe.nutrition.protein && (
                                    <div className='nutrition-item'>
                                        <span className='nutrition-label'>Protein</span>
                                        <span className='nutrition-value'>{recipe.nutrition.protein}g</span>
                                    </div>
                                )}
                                {recipe.nutrition.carbs && (
                                    <div className='nutrition-item'>
                                        <span className='nutrition-label'>Carbs</span>
                                        <span className='nutrition-value'>{recipe.nutrition.carbs}g</span>
                                    </div>
                                )}
                                {recipe.nutrition.fats && (
                                    <div className='nutrition-item'>
                                        <span className='nutrition-label'>Fats</span>
                                        <span className='nutrition-value'>{recipe.nutrition.fats}g</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Detailed
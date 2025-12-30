import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Fav = () => {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        // Load favorites from localStorage
        const storedFavorites = localStorage.getItem('recipeFavorites')
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites))
        }
        setLoading(false)
    }, [])

    const removeFavorite = (recipeId) => {
        const updatedFavorites = favorites.filter(fav => fav._id !== recipeId)
        setFavorites(updatedFavorites)
        localStorage.setItem('recipeFavorites', JSON.stringify(updatedFavorites))
    }

    const calculateAverageRating = (recipe) => {
        if (recipe.rating.totalUsers === 0) return 0
        return (recipe.rating.totalStars / recipe.rating.totalUsers).toFixed(1)
    }

    const handleReadRecipe = (recipeId) => {
        navigate(`/recipe/${recipeId}`)
    }

    const goBack = () => {
        navigate('/')
    }

    return (
        <div className='fav-container'>
            <div className='fav-header'>
                <button onClick={goBack} className="back-button">
                    ← Back to All Recipes
                </button>
                <h1 className='fav-title'>❤️ My Favorite Recipes</h1>
            </div>

            <div className='fav-content'>
                {loading ? (
                    <div className="loading-spinner">
                        <p>Loading favorites...</p>
                    </div>
                ) : favorites.length === 0 ? (
                    <div className="empty-favorites">
                        <h2>No favorites yet!</h2>
                        <p>Start adding your favorite recipes to see them here.</p>
                        <button onClick={goBack} className="browse-btn">
                            Browse Recipes
                        </button>
                    </div>
                ) : (
                    <div className="favorites-grid">
                        {favorites.map(recipe => (
                            <div key={recipe._id} className="favorite-card">
                                <img 
                                    className='favorite-img' 
                                    src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"} 
                                    alt={recipe.name}
                                />
                                <div className="favorite-content">
                                    <h3>{recipe.name}</h3>
                                    <div className="recipe-info">
                                        <p><strong>🍽️ Type:</strong> {recipe.mealType}</p>
                                        <p><strong>⏱️ Time:</strong> {recipe.cookingTime} min</p>
                                        <p><strong>📊 Level:</strong> {recipe.difficultyLevel}</p>
                                    </div>
                                    <div className='rating-section'>
                                        <div className="rating-display">
                                            <span className="rating-number">{calculateAverageRating(recipe)}</span>
                                            <svg className='star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(240,187,64,1)">
                                                <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                                            </svg>
                                            <span className="rating-count">({recipe.rating.totalUsers})</span>
                                        </div>
                                    </div>
                                    <div className="favorite-actions">
                                        <button 
                                            className="read-recipe-btn"
                                            onClick={() => handleReadRecipe(recipe._id)}
                                        >
                                            Read Recipe →
                                        </button>
                                        <button 
                                            className="remove-btn"
                                            onClick={() => removeFavorite(recipe._id)}
                                        >
                                            Remove ❌
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Fav
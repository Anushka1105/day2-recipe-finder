import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {
    const [recipes, setRecipes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchRecipes()
    }, [])

    const fetchRecipes = async () => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:5000/api/get')
            const data = await response.json()
            if (data.success) {
                setRecipes(data.data)
            }
        } catch (error) {
            console.error('Error fetching recipes:', error)
        } finally {
            setLoading(false)
        }
    }

    const searchRecipeByName = async () => {
        if (!searchTerm.trim()) {
            fetchRecipes()
            return
        }
        
        setSearchLoading(true)
        try {
            const response = await fetch(`http://localhost:5000/api/get/recipe/${searchTerm}`)
            if (response.ok) {
                const data = await response.json()
                setRecipes([data])
            } else {
                alert('Recipe not found!')
                setRecipes([])
            }
        } catch (error) {
            console.error('Error searching recipe:', error)
            alert('Error searching recipe')
        } finally {
            setSearchLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchRecipeByName()
        }
    }

    const calculateAverageRating = (recipe) => {
        if (recipe.rating.totalUsers === 0) return 0
        return (recipe.rating.totalStars / recipe.rating.totalUsers).toFixed(1)
    }

    const handleReadRecipe = (recipeId) => {
        navigate(`/recipe/${recipeId}`)
    }

    const goToFavorites = () => {
        navigate('/favorites')
    }

    return (
        <div className="container">
            <div className='upper-section'>
                <div className='nav'>
                    <div>
                        <h1>🍳 Recipe Finder</h1>
                    </div>
                    <div className='view'>
                        <button onClick={fetchRecipes}>All Recipes</button>
                        <button onClick={goToFavorites}>Favourites</button>
                    </div>
                </div>

                <div className='search'>
                    <i className="ri-search-line"></i>
                    <input 
                        className='input' 
                        type="text" 
                        placeholder="Search recipes by name..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={searchRecipeByName} disabled={searchLoading}>
                        {searchLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>

            <div className='bottom-section'>
                <div className="card">
                    <h2 style={{ color: '#ff7b00', marginBottom: '20px' }}>
                        All Recipes ({recipes.length})
                    </h2>
                    {loading ? (
                        <div className="loading-spinner">
                            <p>Loading recipes...</p>
                        </div>
                    ) : recipes.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#666', fontSize: '18px', marginTop: '40px' }}>
                            No recipes found. Try a different search!
                        </p>
                    ) : (
                        <div className="recipes-grid">
                            {recipes.map(recipe => (
                                <div key={recipe._id} className="recipe-card">
                                    <img 
                                        className='recipe-img' 
                                        src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"} 
                                        alt={recipe.name}
                                    />
                                    <div className="recipe-content">
                                        <h3>{recipe.name}</h3>
                                        <div className="recipe-info">
                                            <p><strong>Type:</strong> {recipe.mealType}</p>
                                            <p><strong>Time:</strong> {recipe.cookingTime} min</p>
                                            <p><strong>Level:</strong> {recipe.difficultyLevel}</p>
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
                                        <button 
                                            className="read-recipe-btn"
                                            onClick={() => handleReadRecipe(recipe._id)}
                                        >
                                            Read Recipe →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
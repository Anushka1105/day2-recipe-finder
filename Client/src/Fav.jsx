import React from 'react'

const Fav = () => {
  return (
    <div className='container'>
        <div className="fav">
            <h1>Favorite Recipes</h1>
            {favorites.length > 0 && (
                <div className="card">
                    <h2>Favorites ({favorites.length})</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px', marginTop: '15px' }}>
                        {favorites.map(recipe => (
                            <div key={recipe.id} className="card" style={{ margin: 0 }}>
                                <h3>{recipe.name}</h3>
                                <p>{recipe.ingredients}</p>
                                <button onClick={() => toggleFavorite(recipe)} style={{ backgroundColor: '#dc3545' }}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Fav
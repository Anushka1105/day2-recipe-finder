import React from 'react'

const Detailed = () => {
  return (
    <div className='container'>
        <div className='left'>
            <div className='image'>
                <img src="https://images.unsplash.com/photo-1609159085820-d9a6ff0f469e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <h1>Pizza</h1>
        </div>
        <div className='right'>
            <h2>Ingredients</h2>
            <ul>
                <li>2 cups of flour</li>
                <li>1 cup of water</li>
                <li>1/2 cup of tomato sauce</li>
                <li>1 cup of cheese</li>
                <li>1 cup of toppings (pepperoni, mushrooms, etc.)</li>
            </ul>
            {/* <ul className="ingredients-list">
  {recipe.ingredients.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul> */}
                <h2 className='instruction'>Instructions</h2>
                <ul>
                    <li>2 cups of flour</li>
                    <li>1 cup of water</li>
                    <li>1/2 cup of tomato sauce</li>
                    <li>1 cup of cheese</li>
                    <li>1 cup of toppings (pepperoni, mushrooms, etc.)</li>
                </ul>
                {/* <ul className="ingredients-list">
    {recipe.ingredients.map((item, index) => (
        <li key={index}>{item}</li>
    ))}
    </ul> */}
        <h3>Total Time : 30 Minutes</h3>
        <h3>Difficulty Level : 30 Minutes</h3>
        <h3>Type of Food : 30 Minutes</h3>
        <h3>Rating : 5 <svg className='star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(240,187,64,1)"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg></h3>
        
        </div>
    </div>
  )
}

export default Detailed
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Detailed from './Detailed.jsx'
// import './Detailed.css'
import Fav from './Fav.jsx'
import './Fav.css'
import AddRecipe from './AddRecipe.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* <App /> */}
        {/* <Detailed /> */}
        {/* <Fav /> */}
        <AddRecipe />

    </React.StrictMode>,
)

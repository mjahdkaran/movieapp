import { useState } from 'react'
import './App.css'
import Movies from './Pages/Movies/Movies'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './routes'

function App() {

  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App

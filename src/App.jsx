import { useState } from 'react'
import './App.css'
import Movies from './Pages/Movies/Movies'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './routes'
import { AuthProvider } from './Context/AuthContext'

function App() {

  return (
    <Router>

      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>


  )
}

export default App

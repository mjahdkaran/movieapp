import { useState } from 'react'
import './App.css'
import Movies from './Pages/Movies/Movies'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import AppRouter from './routes'
import { AuthProvider } from './Context/AuthContext'
import { ErrorBoundary } from 'react-error-boundary'
import FallBackComponent from './Pages/Error'

function App() {

  return (
    <Router>

    <ErrorBoundary fallback={FallBackComponent}
    onError={(error, info) => {
      console.error('خطای رخ‌داده:', error, info);
      // ارسال اطلاعات خطا به سرور
    }}
  
      >

        <AuthProvider>
          <AppRouter />
        </AuthProvider>
    </ErrorBoundary>
    </Router>



  )
}

export default App

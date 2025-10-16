import { useState } from 'react'
import './App.css'
import Login from './pages/login'
import SignUp from './pages/Signup'

function App() {
  const [currentPage, setCurrentPage] = useState('login')

  return (
    <>
      {currentPage === 'login' ? (
        <Login onNavigateToSignUp={() => setCurrentPage('signup')} />
      ) : (
        <SignUp onNavigateToLogin={() => setCurrentPage('login')} />
      )}
    </>
  )
}

export default App
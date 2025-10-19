import { useState } from 'react'
import './App.css'
import Login from './pages/login'
import SignUp from './pages/Signup'
import SidebarWithAppbar from './Components/SidebarWithAppbar'

function App() {
  const [currentPage, setCurrentPage] = useState('login')

  return (
    <>
      {/* {currentPage === 'login' ? (
        <Login onNavigateToSignUp={() => setCurrentPage('signup')} />
      ) : (
        <SignUp onNavigateToLogin={() => setCurrentPage('login')} />
      )} */}
      <SidebarWithAppbar />
    </>
  )
}

export default App
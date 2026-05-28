import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Trends from './pages/Trends'


function App() {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/feed' element={<Feed />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/trends" element={<Trends />} />
        </Routes>
      </div>

    </div>
  )
}

export default App
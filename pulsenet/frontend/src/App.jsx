import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'

import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Trends from './pages/Trends'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<Layout />}>
          <Route path='/feed' element={<Feed />} />
          <Route path='/perfil' element={<Profile />} />
          <Route path='/trends' element={<Trends />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
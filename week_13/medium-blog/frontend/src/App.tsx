import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Create from './pages/create'
import Blog from './pages/Blog'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-post" element={<Create />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { UserContext } from "./UserContext";
import Dashboard from './Dashboard'

function App() {
  const user = {
    name: "Rahul",
    age: 22,
  };

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  )
}

export default App

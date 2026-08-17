import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import './App.css'
import axios from 'axios'
function App() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("")
  const callfunction = () => {
    console.log("elskdjflksdj")
    axios.post("http://localhost:3000/reset-password", {
      email: "sangam@gmail.com",
      otp: otp,
      newPassword: newPassword,
      token: token +"asdfasfda"
    })
  }

  return (
    <>
      <div>
        <input type="text" placeholder='OTP' onChange={(e) => setOtp(e.target.value)} value={otp} />
        <input type="text" placeholder='New Password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
        <Turnstile onSuccess={(token) => {
          setToken(token)
        }} siteKey='0x4AAAAAAERiQ3AFJbGt31Cd' />
        <button onClick={callfunction}>Update password</button>
      </div>

    </>
  )
}

export default App

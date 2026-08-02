import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import axios from 'axios'

function UseEffect() {
    const [user, setUser] = useState({})
    useEffect(() => {
        const userData = axios.get('https://jsonplaceholder.typicode.com/users/1')
            .then((res) => {
                setUser(res.data)
            })
    }, [])

    return (
        <>
            <h1>User Data</h1>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </>
    )
}

export default UseEffect

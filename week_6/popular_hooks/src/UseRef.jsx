import React from 'react'
import {useState, useRef, useEffect} from 'react'
const UseRef = () => {
    const [incomeTax, setIncomeTax] = useState(100000)
    const divRef = useRef(null)
    useEffect(() => {
        setTimeout(() => {
            divRef.current.innerHTML =1000;
        }, 5000)
    },[])
  return (
    <>
    Hi there, your income tax returns are <div ref={divRef}>{incomeTax}</div>
    </>
  )
}

export default UseRef
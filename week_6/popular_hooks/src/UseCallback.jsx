import React from 'react'
import { useCallback, memo } from 'react'
export const UseCallback = () => {
    const [count, setCount] = React.useState(0)
    const logSomething = useCallback(() => {
        console.log('Something logged!')
    }, [])

  return (
    <>
        <ChildComponent inputFunction={logSomething} />
        <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </>
  )
}

const ChildComponent = memo(({inputFunction}) => {
    return (
        <div>
            <button onClick={inputFunction}>Click me</button>
        </div>
    )
})

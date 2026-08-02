import React from 'react'
import { useMemo , useState} from 'react'
export const UseMemo = () => {
    const [count, setCount] = React.useState(0)
    const [inputValue, setInputValue] = useState(1)

    let sum = useMemo(() => {
        console.log('Calculating sum...')
        let total = 0
        for (let i = 1; i <= inputValue; i++) {
            total += i
        }
        return total
    },
    [inputValue])

  return (
    <>
        <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <br/>
        Sum from 1 to {inputValue} is: {sum}
        <br/>
        <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </>
  )
}

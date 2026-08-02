import { useState } from 'react'
import './App.css'
import { countAtom } from './store/atoms/count';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';

function App() {

  return (
    <>
      <RecoilRoot> 
        <Count/>
      </RecoilRoot>
    </>
  )
}

function Count() {
  return <div>
    <CounterRenderer/>
    <Buttons/>
  </div>
}

function CounterRenderer() {
  const count = useRecoilValue(countAtom);
  return <div>
    <h1>Count: {count}</h1>
    <EvenCounterRenderer/>
  </div>
}

function Buttons() {
  const [count, setCount] = useRecoilState(countAtom);
  return <div>
    <button onClick={() => setCount(count + 1)}>Increment</button>
    <button onClick={() => setCount(count - 1)}>Decrement</button>
  </div>
}

function EvenCounterRenderer() {
  const even = useRecoilValue(evenSelector);
  return <div>
    <h2>Even: {even}</h2>
  </div>
}

export default App

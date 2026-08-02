## useEffect useMemo useCallback customHook useRef

### useEffect
> The 'useEffect' hook is a feature in React, a popular javascript library for building user interface. It allows you to perform side effects in function components. side effects are operations that can affect other components or can't be dont during rending, such as data fetching, subscriptions, or manually changing the DOM in React components.

```
useEffect( () => {
 // function or logic
}, [ dependacy var here ])
```
### useMemo
> 'useMemo' is a React Hook that caches the result of a calculation and recomputes it only when its dependencies change, helping avoid unnecessary calculations.

```
let sum = useMemo(() => {
        let total = 0
        for (let i = 1; i <= inputValue; i++) {
            total += i
        }
        return total
    },
    [dependency var])
```
> useMemo optimizes calculations during rendering, while useEffect runs side effects after rendering.

### useCallback

> 'useCallback' is a hook in React. It is used to memoize functions, which can help in optimizing the performance of your application, especially in cases involving child components that rely on reference equality to prevent unnecessay renders.

```
 const logSomething = useCallback(() => {
    console.log('Something logged!')
}, [])

```
`memo` is prevet rerender child when parent chages with no propes change

### customHook
> In raw fucntion we can't use state variable so we can use customhook to use define a logic and keep it from seprate from app component

```
// Custom Hook define
export function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return width;
}

// Using the Custom Hook in app component
function App() {
    const width = useWindowWidth();

    return <h2>Window Width: {width}px</h2>;
}

```

### Reconsiliation
Reconciliation in React is the process of comparing the new Virtual DOM with the previous Virtual DOM and updating only the necessary parts of the real DOM.
> State/props change → React re-renders → compares old & new UI → updates only what changed.

### useRef
> `useRef` is a React Hook used to store a value or reference a DOM element without causing a re-render when the value changes.
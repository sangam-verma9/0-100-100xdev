## Routing and Lazy routing Prop drilling
### Routing
We use react-router-dom library for routing that uses BrowserRouter to route the pages

### React.Lazy
React.lazy() provides lazy loading / code splitting for components.
> A lazy component needs a `<Suspense>` boundary so React has something to display while its code is loading.

### Prop drilling
Prop drilling means passing data from a parent component through one or more intermediate components just so a deeply nested component can use it.
### context api
React's Context API is one common way to avoid excessive prop drilling for data that many distant components need.

> In context api if i pass context to a parent then we use it at third level lower that data then when third level node get updated then in context api second level parent also get rendered again. To solve this we use other state management libraries like `Redux` or `Recoil`  or `Zustand`

### Recoil 
It has a concept of an atom to store the state. An atom can be defined outside the component can be teleported to any component
```
RecoilRoot
atom
useRecoilState
useRecoilValue
useSetRecoilState
selector

```




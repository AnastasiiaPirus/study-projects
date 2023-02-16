This is small filter application build to practice React features like `useState`, `useMemo`, `useRef`, `useEffect`.

Users can add items to list. Items will be stored in local storage.
Then user can filter this items.

Main benefits of this search filter: 
1) It is not duplicating state of all items.
2) Not overwriting filtered items when page reloads. It owerwrites it only if items state or search query changed.
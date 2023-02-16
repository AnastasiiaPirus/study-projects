import { useState, useRef, useEffect, useMemo } from "react";

function App() {

  const LOCAL_STORAGE_KEY = "filter-app"
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")
  const itemRef = useRef();

  const filteredItems = useMemo(() => { //useMemo make it owerwrite this only when 'items' or 'query' change.
    return items.filter(item => {
      return item.toLowerCase().includes(query.toLowerCase())
    })
  }, [items, query])

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) //JSON.parse converts our string to an array.
    if (storedItems) setItems(prevItems => [...prevItems, ...storedItems,]);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items)) // JSON.stringlify ransforms objects to JSON string.
  }, [items])

  function addItem(e) {
    e.preventDefault();

    const item = itemRef.current.value
    if (item === "") return
    setItems(prevItems => {
      return [...prevItems, item]
    })
    itemRef.current.value = null;

  }


  return (
    <>
      Search: <input value={query} type="search" onChange={e => setQuery(e.target.value)} /> 
      <form onSubmit={addItem} >
        New item: <input type="text" ref={itemRef} />
        <button type="submit" >Add</button>
      </form>
      <h3>Items:</h3>
      {filteredItems.map(item => (
        <div>{item}</div>
      ))}
    </>
  );
}

export default App;

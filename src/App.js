import './App.css';
import { useState, useEffect } from "react";
import Element from "./Item";

const App = () => {
  const [list, setList] = useState([]);
  const [item, setItem] = useState({ title: "", id: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    let oldList = JSON.parse(localStorage.getItem("list"));
    if (oldList) {
      setList(oldList);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list])



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside the if statment" , item)
    if (item.title) {
      let newList = [...list, item];
      setList(newList);
      setItem({title : "" , id : list.length+1});
    }
    else {
      setError("Please enter a value");
    }
  }


  // handleChange
  const handleChange = (title) => {
    if (error){
      setError(prevState => !prevState);
    }
    setItem(prevState => {
      return {
        ...prevState,
        title: title,
      }
    })
  }


  // delete
  const deleteItem = (elementID) => {
    let newList = list.filter((item) => item.id !== elementID);
    console.log("the new list" , newList);
    setList(newList);
  }


  // the edit 
  const editItem = (id, newValue) => {
    let newList = [...list];
    let index = list.findIndex((element) => element.id === id);
    newList[index].title = newValue;
    setList(newList);
  }

  const deleteList = ()=>{
    setList([]);
  }

  return (
    <main className="Container">
      <form onSubmit={(e) => handleSubmit(e)}>
        {error && <p className = "Error">{error}</p>}
        <h1 className = "Heading">Grocery Bud</h1>
        <input onChange={(e) => handleChange(e.target.value)} value={item.title} type="string" placeholder="e.g egg" />   
        <input type="submit" value="submit" />
      </form>
      {/* The List  */}
      <section>
        <ul>
          {list.map(({ id, title }) => {
            return (
              <Element key={id} elementId={id} deleteItem={deleteItem} editItem={editItem}>{title}</Element>
            )
          })}
        </ul>
        {list.length ? <button onClick = {deleteList} className = "ClearBtn"> Clear All Items </button> : null}
      </section>
    </main>
  );
}
export default App;
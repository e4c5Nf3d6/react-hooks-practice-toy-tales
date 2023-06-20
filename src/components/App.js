import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then(r => r.json())
    .then(data => setToys(data))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addNewToy (toy) {
    fetch("http://localhost:3001/toys", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toy)
    })
    .then(r => r.json())
    .then(data => setToys([...toys, data]))
  }

  function deleteToy(toyToDelete) {
    fetch(`http://localhost:3001/toys/${toyToDelete.id}`, { method: 'DELETE' })
    .then(r => r.json())
    .then(() => {
      const updatedToys = toys.filter(toy => toy.id !== toyToDelete.id)
      setToys(updatedToys)
    })
  }

  function likeToy(toyToLike) {
    const updatedLikes = toyToLike.likes + 1

    fetch(`http://localhost:3001/toys/${toyToLike.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ likes: updatedLikes })
    })
    .then(r => r.json())
    .then(data => {
      const updatedToys = toys.map(toy => {
        if (toy.id === data.id) {
          return data
        } else {
          return toy
        }
      })
      setToys(updatedToys)
    })
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddNewToy={addNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={deleteToy} onLikeToy={likeToy} />
    </>
  );
}

export default App;

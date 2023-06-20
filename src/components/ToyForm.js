import React, {useState} from "react";

function ToyForm({ onAddNewToy }) {
  const [formData, setFormData] = useState({
    image: "",
    likes: 0,
    name: ""
  })

  function handleChange(e) {
    const value = e.target.value
    const key = e.target.name

    setFormData({
      ...formData,
      [key]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAddNewToy(formData)
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;

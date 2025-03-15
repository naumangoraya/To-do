import { useState } from "react";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleAddTodo() {
    fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then(async (res) => {
        const json = await res.json();
        alert("Todo added successfully!");
      })
      .catch((err) => console.error("Error adding todo:", err));
  }

  return (
    <>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add a Todo</button>
    </>
  );
}

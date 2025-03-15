import React from "react";

function ShowTod({ todos, refreshTodos }) {
  function handleCompleteTodo(id) {
    fetch("http://localhost:3000/completed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(async (res) => {
        const json = await res.json();
        alert("Todo completed successfully!");
        if (refreshTodos) refreshTodos(); // Refresh todos after update
      })
      .catch((err) => console.error("Error completing todo:", err));
  }

  return (
    <>
      {todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        todos.map((todo) => (
          <div key={todo._id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => handleCompleteTodo(todo._id)}>
              {todo.completed ? "Completed" : "Complete"}
            </button>
          </div>
        ))
      )}
    </>
  );
}

export default ShowTod;

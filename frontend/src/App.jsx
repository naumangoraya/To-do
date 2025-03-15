import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import ShowTod from "./components/ShowTod";
import { useEffect, useState } from "react";
function App() {
  const [todos, setTodos] = useState([]); // State to store todos
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.todos); // Assuming API returns { todos: [...] }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <CreateTodo />
      <ShowTod todos={todos} />
    </>
  );
}

export default App;

const express = require("express");
const { createTodo } = require("./types");
const { todo } = require("./db");
const { updateTodo } = require("./types");
const app = express();
const port = 3000;

app.use(express.json());
// body{
//     title:String
//     description:String
// }

app.post("/todo", async function (req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent wrong input",
    });
    return;
  }
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  res.json({
    msg: "todo created",
  });
});

//////////////////////////

app.get("/todo", async function (req, res) {
  const todos = await todo.find({});
  res.json({
    todos,
  });
});

//////////////////

app.put("/completed", async function (req, res) {
  const updatePayload = req.body;

  // Validate input
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    return res.status(411).json({ msg: "You sent wrong input" });
  }

  // Update the document using Mongoose's `findByIdAndUpdate`
  const updatedTodo = await todo.findByIdAndUpdate(
    req.body.id,
    { completed: true },
    { new: true }
  );

  if (!updatedTodo) {
    return res.status(404).json({ msg: "Todo not found" });
  }

  res.json({ msg: "Todo marked as completed", todo: updatedTodo });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

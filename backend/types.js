const zod = require("zod");

const createTodo = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const updateTode = zod.object({
  id: zod.string(),
});

module.exports = {
  createTodo: createTodo,
  updateTode: updateTode,
};

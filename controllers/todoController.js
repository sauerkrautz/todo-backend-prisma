import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTodos = async (req, res) => {
  const user = await prisma.users.findUnique({
    where: {
      uuid: req.session.user,
    },
  });
  try {
    let todos;
    if (user.role === "admin") {
      todos = await prisma.todos.findMany({
        include: {
          users: true,
        },
      });
    } else {
      todos = await prisma.todos.findMany({
        where: {
          userId: req.id,
        },
        include: {
          users: true,
        },
      });
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createTodos = async (req, res) => {
  const { text } = req.body;
  const d = new Date();
  const time = `${d.toLocaleTimeString()} ${d.toLocaleDateString()}`;

  try {
    await prisma.todos.create({
      data: {
        text: text,
        userId: req.id,
        date: time,
        completed: false,
        crazy: false,
      },
    });

    res.status(200).json({ msg: "todo created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.todos.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const deleteManyTodos = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({ msg: "todos deleted" });
//   }
// };

export const updateTodo = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.todos.update({
      where: {
        id: id,
      },
    });

    res.status(200).json({ msg: "todo deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

const findDuplicate = async (email) => {
  const users = await prisma.users.findMany();
  const duplicate = users.find((e) => {
    return e.email === email;
  });
  if (duplicate === undefined) {
    return null;
  } else {
    return duplicate;
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      include: {
        todos: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { email, password, role, name } = req.body;
  if (await findDuplicate(email)) {
    return res.status(400).json({ msg: "user already exists" });
  }
  const hashed = await argon2.hash(password);
  try {
    await prisma.users.create({
      data: {
        email: email,
        name,
        password: hashed,
        role: role ? role : "user",
      },
    });
    res.status(200).json({ msg: "user created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const uuid = req.params.id;
    const user = await prisma.users.findUnique({
      where: {
        uuid: uuid,
      },
      include: {
        todos: true,
      },
    });
    if (!user) return res.status(404).json({ msg: "user not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: "user not found" });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, role } = req.body;
  const uuid = req.params.id;
  const user = await prisma.users.findUnique({
    where: {
      uuid: uuid,
    },
  });

  if (!user) return res.status(404).json({ msg: "user not found" });

  try {
    await prisma.users.update({
      where: {
        uuid: user.uuid,
      },
      data: {
        name: name ? name : user.name,
        email: email ? email : user.email,
        role: role ? role : user.role,
      },
    });

    res.status(200).json({ msg: "user updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const uuid = req.params.id;
    const deleted = await prisma.users.delete({
      where: {
        uuid: uuid,
      },
    });
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const dropAllTables = async (req, res) => {
  try {
    await prisma.$queryRaw`DROP TABLE IF EXISTS users,todos,sessions,_prisma_migrations;`;
    res.status(200).json({ msg: "all tables have been dropped" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

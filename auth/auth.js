import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return res.status(404).json({ msg: "user not found" });

    const match = argon2.verify(user.password, password);

    if (!match || user.email !== email)
      return res.status(400).json({ msg: "email or password does not match" });

    req.session.user = user.uuid;

    res.status(200).json({ ...user, session: req.session.user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const checkLoginStatus = async (req, res) => {
  const user = await prisma.users.findUnique({
    where: {
      uuid: req.session.user,
    },
  });

  if (!user)
    return res.status(404).json({
      msg: "please login to your account or register if you don't have one yet",
    });

  return res.status(200).json(user);
};

export const logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(400).json({ msg: error.message });
    res.status(200).json({ msg: "logged out" });
  });
};

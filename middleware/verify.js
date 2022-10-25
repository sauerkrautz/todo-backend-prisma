import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyUser = async (req, res, next) => {
  if (!req.session.user)
    return res.status(400).json({
      msg: "please login to your account or register if you don't have one yet",
    });

  const user = await prisma.users.findUnique({
    where: {
      uuid: req.session.user,
    },
  });

  if (!user)
    return res.status(404).json({
      msg: "user not found",
    });

  req.id = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await prisma.users.findUnique({
    where: {
      uuid: req.session.user,
    },
  });

  if (!user) return res.status(404).json({ msg: "user not found" });

  if (user.role !== "admin")
    return res.status(403).json({ msg: "access denied" });

  next();
};

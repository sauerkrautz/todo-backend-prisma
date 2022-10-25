import express from "express";
import cors from "cors";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import * as env from "dotenv";
import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";
import todoRoute from "./routes/todoRoutes.js";

env.config();
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(
  session({
    secret: "key",
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    resave: false,
    cookie: {
      secure: "auto",
      maxAge: 7 * 24 * 60 * 1000,
    },
  })
);

app.use(authRoute);

app.use(userRoute);

app.use(todoRoute);

app.listen(5000, () => {
  console.log("connected to prisma mysql");
});

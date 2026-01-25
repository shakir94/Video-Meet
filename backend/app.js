import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";

import cors from "cors";
import userRoutes from "./src/routes/user.routes.js";
import { connectToSocket } from "./src/controllers/socket.manager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect(
    "mongodb+srv://loneshakir418_db_user:RqyulpO7DsXdqMQl@cluster0.sxbhkhb.mongodb.net/",
  );
  console.log(`MONGO Connected DB Host : ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISTING AT PROT 8000");
  });
};
start();

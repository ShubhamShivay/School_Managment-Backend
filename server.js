import http from "http";
import mongoose from "mongoose";
import app from "./app/app.js";


const PORT = process.env.PORT || 5000;

//! Connect to local MongoDB

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import "dotenv/config";
import env from "./utility/validateEnv";
import mongoose from "mongoose";
import express from "express";

const app = express();
const port = env.SERVER_PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World");
})

mongoose.connect(env.MONGO_CONNECTION_STRING!)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log(`Server started on port: ${port}`)
        })
    })
    .catch(console.error)

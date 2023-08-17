require("dotenv/config");
import env from "./utility/validateEnv";
import mongoose from "mongoose";
import logger from "./config/logger";
import server from "./utility/server";

const app = server();
const port = env.SERVER_PORT || 5000;

mongoose
.connect(env.MONGO_CONNECTION_STRING)
.then(() => {
    logger.info("Mongoose connected");
})
.catch(logger.error)
    
app.listen(port, () => {
    logger.info(`Server started on port: ${port}`)
})
    
    // if (process.env.NODE_ENV === 'production') {
    //     app.use(express.static(path.join(__dirname, '../frontend/build')))
    //     app.get('*',
    //         (req, res) =>
    //             res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index')))
    // }
import { cleanEnv } from "envalid";
import { str, port } from "envalid/dist/validators";

const env = cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    SERVER_PORT: port(),
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    JWT_SECRET_KEY: str()
})

export default env;
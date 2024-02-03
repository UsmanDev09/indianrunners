import { cleanEnv } from "envalid";
import { str, port } from "envalid/dist/validators";

const env = cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    SERVER_PORT: port(),
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    JWT_SECRET_KEY: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
    CLOUDINARY_CLOUD_NAME: str(),
    RAZOR_PAY_API_KEY: str(),
    RAZOR_PAY_API_SECRET: str(),
    CLIENT_DOMAIN: str(),
})

export default env;
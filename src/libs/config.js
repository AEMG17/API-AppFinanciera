import { config } from "dotenv";

config();

export default {
    URL: process.env.TURSO_DATABASE_URL,
    AUTHTOKEN: process.env.TURSO_AUTH_TOKEN,
    PORT: process.env.PORT || process.env.DEVELOPMENT_PORT,
    SECRET: process.env.SECRET || "",
}
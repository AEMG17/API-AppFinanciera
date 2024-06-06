import { createClient } from "@libsql/client";
import config from "../libs/config.js";

// Este es el cliente utilizado para poder realizar consultas a la DB de Turso.
export const databaseClient = createClient({
  url: config.URL,
  authToken: config.AUTHTOKEN
});

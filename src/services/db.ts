import { Connection, createConnection } from "mysql2";
import config from "../config";

export const connection: Connection = createConnection(config.db);

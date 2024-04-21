import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import * as sbSchema from "./schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.error("Cannot Find Database URL");
}

let connection: postgres.Sql;

if (process.env.NODE_ENV === "production") {
  connection = postgres(process.env.DATABASE_URL as string, { prepare: false });
} else {
  const globalConnection = global as typeof globalThis & {
    connection: postgres.Sql;
  };

  if (!globalConnection.connection) {
    globalConnection.connection = postgres(process.env.DATABASE_URL as string, {
      prepare: false,
    });
  }

  connection = globalConnection.connection;
}

const db = drizzle(connection, {
  schema: { ...schema, ...sbSchema },
  // logger: process.env.NODE_ENV === "development",
});
const migrateDB = async () => {
  try {
    console.log("Migrating Client");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("Successfully Migrated Client");
  } catch (error: any) {
    console.error("Error Migrating Client");
    console.error(error.message);
  }
};
// migrateDB();
export default db;

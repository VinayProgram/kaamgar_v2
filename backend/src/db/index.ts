import dotenv from 'dotenv';
dotenv.config();
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
console.log('Database URL:', process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({ client: pool });


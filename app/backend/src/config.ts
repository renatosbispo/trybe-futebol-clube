import 'dotenv/config';
import { Options } from 'sequelize';

export default class Config {
  public static db: Options = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'TRYBE_FUTEBOL_CLUBE',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: false,
    // query: { raw: true },
  };
}

import dotenv from 'dotenv';
import { Options } from 'sequelize';

dotenv.config();

const config: { [key: string]: Options } = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || undefined,
    database: process.env.DB_NAME || 'database_development',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: (process.env.DB_DIALECT as 'postgres' | 'mysql') || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: console.log
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || undefined,
    database: process.env.DB_NAME_TEST || 'database_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: (process.env.DB_DIALECT as 'postgres' | 'mysql') || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: (process.env.DB_DIALECT as 'postgres' | 'mysql') || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  }
};

module.exports = config;

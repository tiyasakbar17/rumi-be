# TOEFL PBT Backend

Backend service for the TOEFL PBT testing platform, built with Express.js and Sequelize.

## Overview

This project provides the API for managing tests, users, payments, and administration for a TOEFL PBT platform. It supports both PostgreSQL and MySQL databases.

## Prerequisites

- Node.js (Latest LTS recommended)
- PostgreSQL or MySQL database

## Setup Instructions

1.  **Clone the repository**

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Copy `.env.example` to `.env` and update the values.
    ```bash
    cp .env.example .env
    ```
    Ensure you set the `DB_DIALECT` to either `postgres` (default) or `mysql` depending on your database.

4.  **Database Setup**
    Run the migrations to set up the database schema.
    ```bash
    npm run db:migrate
    ```
    (Optional) Seed the database with initial data:
    ```bash
    npm run db:seed
    ```

## Scripts

-   `npm run dev`: Start the server in development mode with nodemon.
-   `npm start`: Start the server in production mode.
-   `npm run db:migrate`: Run Sequelize migrations.
-   `npm run db:seed`: Run Sequelize seeders.
-   `npm run db:reset`: Drop, recreate, and migrate the database.

## Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Server port | 3000 |
| `DB_HOST` | Database host | 127.0.0.1 |
| `DB_USER` | Database user | postgres |
| `DB_PASSWORD` | Database password | password |
| `DB_NAME` | Database name | toefl_pbt |
| `DB_PORT` | Database port | 5432 |
| `DB_DIALECT` | Database driver (`postgres` or `mysql`) | postgres |
| `JWT_SECRET` | Secret key for JWT signing | - |
| `SMTP_HOST` | SMTP server host | - |
| `SMTP_PORT` | SMTP server port | - |
| `SMTP_USER` | SMTP username | - |
| `SMTP_PASS` | SMTP password | - |

## Project Structure

-   `src/config`: Configuration files (DB, environment).
-   `src/modules`: Feature-based modules (Auth, Test, Payment, Admin, User).
-   `src/shared`: Shared resources (Middleware, Utils, Constants, Validators).
-   `src/migrations`: Database migrations.

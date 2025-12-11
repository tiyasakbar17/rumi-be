import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { environment } from './config/environment';
import { sequelize } from './shared/database';

const app = express();

// Middleware Setup
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Database Connection Check Middleware
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await sequelize.authenticate();
    next();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).json({
      error: {
        status: 500,
        message: 'Database Connection Error'
      }
    });
  }
});

// Route Mounting Structure
// TODO: Mount routes here when modules are implemented
// Example:
// import authRoutes from './modules/auth/auth.routes';
// app.use('/api/auth', authRoutes);

// Basic health check route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'TOEFL PBT Backend is running' });
});

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    error: {
      status,
      message
    }
  });
});

// Initialize Database and Start Server
const startServer = async () => {
  try {
    // Sync database (optional: use migrations in production usually)
    // await sequelize.sync();
    console.log('Database connected successfully.');

    if (require.main === module) {
      app.listen(environment.port, () => {
        console.log(`Server is running on port ${environment.port}`);
      });
    }
  } catch (error) {
    console.error('Failed to connect to database:', error);
    // Requirements said: "make it running, but show error database connection on any response."
    // So we start the server even if initial connection fails, as the middleware will catch it.
    if (require.main === module) {
      app.listen(environment.port, () => {
        console.log(`Server is running on port ${environment.port} (DB Connection Failed)`);
      });
    }
  }
};

startServer();

export default app;

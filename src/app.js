const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { port } = require('./config/environment');

const app = express();

// Middleware Setup
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Route Mounting Structure
// TODO: Mount routes here when modules are implemented
// Example:
// const authRoutes = require('./modules/auth/auth.routes');
// app.use('/api/auth', authRoutes);

// const testRoutes = require('./modules/test/test.routes');
// app.use('/api/tests', testRoutes);

// const paymentRoutes = require('./modules/payment/payment.routes');
// app.use('/api/payments', paymentRoutes);

// const adminRoutes = require('./modules/admin/admin.routes');
// app.use('/api/admin', adminRoutes);

// const userRoutes = require('./modules/user/user.routes');
// app.use('/api/users', userRoutes);


// Basic health check route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'TOEFL PBT Backend is running' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
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

// Start Server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;

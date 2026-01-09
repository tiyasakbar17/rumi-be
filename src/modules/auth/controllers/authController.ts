import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const result = await authService.register(email, password, firstName, lastName);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      console.error('Register error:', error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Missing email or password' });
      }

      const result = await authService.login(email, password);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error('Login error:', error);
      const statusCode = error.message === 'Invalid email or password' ? 401 : 500;
      res.status(statusCode).json({ success: false, message: error.message });
    }
  },

  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.body; // or req.query depending on preference, logic matches req

      if (!token) {
        return res.status(400).json({ success: false, message: 'Missing token' });
      }

      const result = await authService.verifyEmail(token);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error('Verify email error:', error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async refreshAccessToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ success: false, message: 'Missing refresh token' });
      }

      const result = await authService.refreshAccessToken(refreshToken);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      console.error('Refresh token error:', error);
      res.status(401).json({ success: false, message: error.message });
    }
  }
};

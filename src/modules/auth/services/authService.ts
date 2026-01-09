import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { models } from '../../../shared/database';
import { environment } from '../../../config/environment';

const { User } = models;

export const authService = {
  async register(email: string, password: string, firstName: string, lastName: string) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType: 'student',
      isEmailVerified: false, // Default false, strictly following prompt
    });

    // Mock sending email verification
    // console.log(`Sending verification email to ${email}...`);
    // Ideally generate a token here and send it via email service

    return {
      userId: user.id,
      email: user.email,
      message: 'Registration successful. Please verify your email.',
    };
  },

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // Update lastLogin
    user.lastLogin = new Date();
    await user.save();

    const payload = { userId: user.id, userType: user.userType };
    const accessToken = jwt.sign(payload, environment.jwtSecret, { expiresIn: '7d' });
    const refreshToken = jwt.sign(payload, environment.jwtSecret, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        userType: user.userType,
      },
    };
  },

  async verifyEmail(token: string) {
    try {
      // Assuming the verification token is a simple JWT containing the userId
      const decoded: any = jwt.verify(token, environment.jwtSecret);
      const user = await User.findByPk(decoded.userId);

      if (!user) {
        throw new Error('User not found');
      }

      user.isEmailVerified = true;
      await user.save();

      return { message: 'Email verified successfully' };
    } catch (error) {
      throw new Error('Invalid or expired verification token');
    }
  },

  async refreshAccessToken(token: string) {
    try {
      const decoded: any = jwt.verify(token, environment.jwtSecret);
      const payload = { userId: decoded.userId, userType: decoded.userType };
      const accessToken = jwt.sign(payload, environment.jwtSecret, { expiresIn: '7d' });

      return { accessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  },

  async resetPassword(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    // Generate reset token
    // Note: User model currently doesn't have a specific field for storing reset token hash
    // or expiration as per previous strict model definitions.
    // We will generate a JWT that acts as the token.
    const resetToken = jwt.sign({ userId: user.id, purpose: 'reset_password' }, environment.jwtSecret, { expiresIn: '1h' });

    // Mock sending email
    console.log(`Sending password reset email to ${email} with token: ${resetToken}`);

    return { message: 'Reset link sent to email' };
  }
};

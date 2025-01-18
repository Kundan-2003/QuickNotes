import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const TokenVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;  // Get token from cookies
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized, please login' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SecriteKey);
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.userId = user._id;  // Attach user ID to the request
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error verifying token:', error);

    // Check if the error is due to token expiration
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired, please login again' });
    }

    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

export { TokenVerification };

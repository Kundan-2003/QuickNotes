import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const TokenVerfication = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized, please login" });
        }

        // Use jwt.verify() to verify the token
        const decoded = jwt.verify(token, process.env.SecriteKey);  // Changed to jwt.verify
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        req.userId = user._id;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export { TokenVerfication };

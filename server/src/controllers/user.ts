import User from '../models/user.js';

export const getCurrentUser = async (req, res) => {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");

};

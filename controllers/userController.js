import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Get all users
export const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
    try {
      const user = await User.findOne({id: req.params.id});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
};

// Update user role (admin only)
export const updateUserRole = async (req, res) => {
    try {
      const user = await User.updateOne(
        { id: req.params.id },
        { $set: { role: req.body.role } }
      );
  
      if (user.modifiedCount === 0) {
        return res.status(404).json({ message: 'Role already the same' });
      }
  
      res.status(200).json({ message: 'The user role has been updated', user });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
};
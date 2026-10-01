const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const userPayload = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role });

// Public signup: always creates a STUDENT. Other roles are created by an admin.
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  if (await User.findOne({ email })) return res.status(409).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password, role: 'student' });
  res.status(201).json({ token: signToken(user), user: userPayload(user) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({ token: signToken(user), user: userPayload(user) });
};

exports.me = (req, res) => res.json({ user: userPayload(req.user) });

// Admin only: create warden / security / admin accounts
exports.createStaff = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!['warden', 'security', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Role must be warden, security or admin' });
  }
  if (await User.findOne({ email })) return res.status(409).json({ message: 'Email already registered' });
  const user = await User.create({ name, email, password, role });
  res.status(201).json({ user: userPayload(user) });
};

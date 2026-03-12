import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// In-memory user storage (for demo - use database in production)
const users = new Map();

// Demo users
users.set('student@demo.com', {
  email: 'student@demo.com',
  password: '$2a$10$8K1p/a0dL3LzZqZqZqZqZOX8K1p/a0dL3LzZqZqZqZqZOX8K1p/a0', // password: demo123
  name: 'Demo Student',
  role: 'student'
});

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, name: user.name, role: user.role },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
  } catch (error) {
    return null;
  }
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }

  req.user = user;
  next();
};

export const registerUser = async (email, password, name) => {
  if (users.has(email)) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);
  const user = {
    email,
    password: hashedPassword,
    name,
    role: 'student'
  };

  users.set(email, user);
  return { email, name, role: user.role };
};

export const loginUser = async (email, password) => {
  const user = users.get(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  return { email: user.email, name: user.name, role: user.role };
};

export const getUserByEmail = (email) => {
  const user = users.get(email);
  if (!user) {
    throw new Error('User not found');
  }
  return { email: user.email, name: user.name, role: user.role };
};

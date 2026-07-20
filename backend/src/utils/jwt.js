import jwt from 'jsonwebtoken';

export const signAuthToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d'
  });

export const verifyAuthToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
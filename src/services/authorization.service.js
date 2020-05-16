import api from './api.service';
import jwt from 'jsonwebtoken';

const isAuthenticated = () => (
  localStorage.getItem('accessToken') !== null
);

const isAdmin = () => {
  const token = localStorage.getItem('accessToken');
  const payload = jwt.decode(token);
  return payload.role === 'admin';
}

const isUser = () => {
  const token = localStorage.getItem('accessToken');
  const payload = jwt.decode(token);
  return payload.role === 'user';
}

const authenticate = async (payload) => {
  const { email, password } = payload;
  try {
    const resp = await api.post('/api/authorization/login', {
      email,
      password
    });
    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const authorize = ({accessToken}) => {
  localStorage.setItem('accessToken', accessToken);
}

const deauthorize = () => {
  localStorage.removeItem('accessToken');
}

export { authenticate, isAuthenticated, deauthorize, authorize, isAdmin, isUser }
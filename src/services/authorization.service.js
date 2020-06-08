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

const getToken = () => {
  const token = localStorage.getItem('accessToken');
  return token;
}

const authenticate = async (payload) => {
  const { email, password } = payload;
  try {
    const resp = await api.post('/api/session', {
      user: {
        email,
        password
      }
    }, {withCredentials: true});
    console.log(resp);
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

export { authenticate, isAuthenticated, getToken, deauthorize, authorize, isAdmin, isUser }
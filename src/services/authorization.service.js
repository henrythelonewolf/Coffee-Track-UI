import api from './api.service';

const isAuthenticated = () => (
  localStorage.getItem('user') !== null &&
  localStorage.getItem('accessToken') !== null
);

const isAdmin = () => {
  const json = localStorage.getItem('user');
  const user = JSON.parse(json);
  return user.role === 'admin';
}

const isUser = () => {
  const json = localStorage.getItem('user');
  const user = JSON.parse(json);
  return user.role === 'user';
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

const authorize = ({accessToken, user}) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('user', JSON.stringify(user));
}

const deauthorize = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
}

export { authenticate, isAuthenticated, deauthorize, authorize, isAdmin, isUser }
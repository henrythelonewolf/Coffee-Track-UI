import axios from 'axios';
// import Router from '../router';
// import { deauthorize, getToken } from './authorization.service';
import { getToken, authorize } from './authorization.service';

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

const instance = axios.create({
  baseURL: `http://localhost:3000`,
});
instance.interceptors.request.use(request => {
  const token = getToken();
  request.headers = {
    Authorization: `Bearer ${token}`
  }
  return request;
}, error => console.log(error));
instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 403) { // unauthorized
    // deauthorize();
    // Router.push('/');
    return resetTokenAndReattemptRequest(error);
  }

  return Promise.reject(error);
});

async function resetTokenAndReattemptRequest(error) {
  console.log(error);
  try {
    const { response: errorResponse } = error;
    const retryOriginalRequest = new Promise(resolve => {
    /* We need to add the request retry to the queue
    since there another request that already attempt to
    refresh the token */
      addSubscriber(access_token => {
        errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
        resolve(axios(errorResponse.config));
      });
    });

    if (isAlreadyFetchingAccessToken === false) {
      const resp = await axios.post('/api/session/refresh', null, {
        withCredentials: true,
        baseURL: 'http://localhost:3000'
      });
      if (resp.status !== 200) {
        return Promise.reject(error);
      }
      const { accessToken } = resp.data;
      authorize({ accessToken });
      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched(accessToken);
    }
    return retryOriginalRequest;
  } catch (err) {
    console.log(err);

    return Promise.reject(err);
  }
}

function onAccessTokenFetched(accessToken) {
  subscribers.forEach(callback => callback(accessToken));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

export default instance;
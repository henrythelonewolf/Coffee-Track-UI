import axios from 'axios';

export default axios.create({
  baseURL: `http://localhost:44364`,
  headers: {
    'Accept': `application/json`,
    'Content-Type':`application/json`
  }
 });
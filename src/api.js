import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
  }
});

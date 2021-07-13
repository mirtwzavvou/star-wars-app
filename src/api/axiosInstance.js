import axios from 'axios';

export default axios.create({
  baseURL: `https://star-wars-api.herokuapp.com/`,
});

import axiosInstance from './axiosInstance';

export default {
  fetchMovies() {
    return axiosInstance.get('/films');
  },
};

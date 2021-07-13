import { connect } from 'react-redux';
import MoviePreview from '../components/MoviePreview/MoviePreview';

const mapStateToProps = (state) => {
  return {
    selectedMovie: state.movies.items.find((movie) => movie.id === state.movies.selectedMovieId) || null,
  };
};
export default connect(mapStateToProps, null)(MoviePreview);

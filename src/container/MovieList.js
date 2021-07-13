import { connect } from 'react-redux';
import { setSelectedMovieId } from '../actions';
import MovieList from '../components/MovieList/MovieList';
import { getSortedFilteredMovies } from '../selector';

const mapStateToProps = (state) => {
  return {
    movieList: getSortedFilteredMovies(state),
    selectedMovieId: state.movies.selectedMovieId,
  };
};

export default connect(mapStateToProps, { setSelectedMovieId })(MovieList);

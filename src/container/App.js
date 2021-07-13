import { connect } from 'react-redux';
import { fetchMoviesIfNeeded } from '../actions';
import App from '../components/App/App.js';

export default connect(null, { fetchMoviesIfNeeded })(App);

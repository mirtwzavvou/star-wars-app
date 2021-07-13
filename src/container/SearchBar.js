import { connect } from 'react-redux';
import { setFilter } from '../actions';
import SearchBar from '../components/SearchBar/SearchBar';

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

export default connect(mapStateToProps, { setFilter })(SearchBar);

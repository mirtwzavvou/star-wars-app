import { connect } from 'react-redux';
import { setSortOption } from '../actions';
import SortOptions from '../components/SortOptions/SortOptions';

export default connect(null, { setSortOption })(SortOptions);

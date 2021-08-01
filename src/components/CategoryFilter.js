import React from 'react';
import PropTypes from 'prop-types';
import { useSelector , useDispatch} from 'react-redux';
import * as actions from '../actions/index'
import './CategoryFilter.css'

function CategoryFilter({ handleFilter }) {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.catReducer);
  const selectedCat = useSelector(state=> state.filterReducer);

  const handleChange = ({ target }) => {
    handleFilter(target.value);
  };


  return (
    <div className="CategoryFilter">
        <label htmlFor="fiter-category" className="CategoryFilter-select">
          Filter By Category
          <select onChange={handleChange} name="category" id="fiter-category">
            <option>{selectedCat}</option>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </label>
    </div>
  );
}

CategoryFilter.defaultProps = {
  handleFilter: () => {},
};

CategoryFilter.propTypes = {
  handleFilter: PropTypes.func,
};

export default CategoryFilter;
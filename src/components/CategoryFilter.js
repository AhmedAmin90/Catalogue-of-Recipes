import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import './CategoryFilter.css'

function CategoryFilter({ handleFilter }) {
  const categories = useSelector(state => state.catReducer)

  const handleChange = ({ target }) => {
    handleFilter(target.value);
  };

  return (
    <div className="CategoryFilter">
        <label htmlFor="fiter-category" className="CategoryFilter-select">
          Filter By Category
          <select onChange={handleChange} name="category" id="fiter-category">
            <option>All</option>
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
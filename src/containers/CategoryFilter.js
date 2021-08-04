import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import './CategoryFilter.css';

const CategoryFilter = ({ handleFilter, value }) => {
  const categories = useSelector((state) => state.catReducer);

  const handleChange = ({ target }) => {
    handleFilter(target.value);
  };

  return (
    <div className="CategoryFilter">
      <label htmlFor="fiter-category" className="CategoryFilter-select">
        Filter By Category
        <select onChange={handleChange} name="category" id="fiter-category">
          <option>{value}</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </label>
    </div>
  );
};

CategoryFilter.defaultProps = {
  handleFilter: () => {},
  value: '',
};

CategoryFilter.propTypes = {
  handleFilter: PropTypes.func,
  value: PropTypes.string,
};

export default CategoryFilter;

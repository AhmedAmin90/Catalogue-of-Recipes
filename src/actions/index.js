const SHOW_FOOD = (food) => ({
  type: 'SHOW_FOOD',
  payload: food,
});

const SHOW_CAT = (cat) => ({
  type: 'SHOW_CAT',
  payload: cat,
});

const CHANGE_FILTER = (cat) => ({
  type: 'CHANGE_FILTER',
  payload: cat,
});

const SELECT_CAT = (name, cat) => ({
  type: 'SELECT_CAT',
  payload: {
    [name]: cat,
  },
});

export {
  SHOW_FOOD, SHOW_CAT, CHANGE_FILTER, SELECT_CAT,
};

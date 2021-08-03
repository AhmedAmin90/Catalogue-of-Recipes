const catReducer = (state = [], action) => {
  if (action.type === 'SHOW_CAT') {
    return [...state, action.payload];
  }

  return state;
};

export default catReducer;

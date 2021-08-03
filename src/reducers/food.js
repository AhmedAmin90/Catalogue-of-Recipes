const foodReducer = (state = [], action) => {
  if (action.type === 'SHOW_FOOD') {
    return [...state, {
      id: action.payload.idMeal,
      name: action.payload.strMeal,
      image: action.payload.strMealThumb,
    }];
  }
  return state;
};

export default foodReducer;

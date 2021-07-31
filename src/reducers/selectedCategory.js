const selectedReducer = (state = [], action) => {
    if (action.type === 'SELECT_CAT' ){
        return [...state, action.payload];
    }
  else {
    return state
  }
  };
  
  export default selectedReducer;
  
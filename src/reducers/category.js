const catReducer = (state = [], action) => {
    if (action.type === 'SHOW_CAT' ){
        return [...state, action.payload];
    }
  else {
    return state
  }
  };
  
  export default catReducer;

const foodReducer = (state = [], action) => {
    if (action.type === 'SHOW_FOOD' ){
        return [...state, {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          image: action.payload.image
        }];
    }
    return state
  };
  
  export default foodReducer;
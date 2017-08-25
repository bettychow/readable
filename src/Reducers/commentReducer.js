import { CREATE_COMMENT, FETCH_ALL_COMMENTS } from "../Actions";

const initialState = {
  comments: []
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_COMMENTS: {
      return {
        ...state,
        comments: action.payload
      };
    }
    break

    case CREATE_COMMENT: {
      const newState = Object.assign( {}, state)
      newState.comments.push(action.payload)
      return newState
    }
    break
   
    default:
      return state;
  }
};

export default commentReducer;

import { CREATE_COMMENT, FETCH_ALL_COMMENTS, FETCH_COMMENT_BY_ID } from "../Actions";

const initialState = {
  comments: [],
  selectedComment:{}
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
    case FETCH_COMMENT_BY_ID: {
      return {
        ...state,
        selectedComment: action.payload
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

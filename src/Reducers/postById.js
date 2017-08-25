import { FETCH_POST_BY_ID, DELETE_POST_BY_ID } from "../Actions";

const initialState = {
  post: {}
};

const postByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_BY_ID: {
      return {
        ...state,
        post: action.payload
      };
    }
    break
    case DELETE_POST_BY_ID: {
      return {
        ...state,
        post: {}
      };
    }
    break
    default:
      return state;
  }
};

export default postByIdReducer;

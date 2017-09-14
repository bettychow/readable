import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'

import postByIdReducer from "./postById";
import homePageReducer from "./homePageReducer";
import commentReducer from "./commentReducer"
import postByCatReducer from "./postByCatReducer"

export default combineReducers({
  singlePostContainer: postByIdReducer,
  allPostsContainer: homePageReducer,
  form: formReducer,
  commentContainer: commentReducer,
  postByCatContainer: postByCatReducer
});

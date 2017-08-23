import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'

import postByIdReducer from "./postById";
import homePageReducer from "./homePageReducer";

export default combineReducers({
  singlePostContainer: postByIdReducer,
  allPostsContainer: homePageReducer,
  form: formReducer
});

import { combineReducers } from "redux";

import postByIdReducer from "./postById";
import homePageReducer from "./homePageReducer";

export default combineReducers({
  singlePostContainer: postByIdReducer,
  allPostsContainer: homePageReducer
});

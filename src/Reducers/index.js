import { combineReducers } from "redux";

import foo from "./postById";
import homePageReducer from "./homePageReducer";

export default combineReducers({
  singlePostContainer: foo,
  allPostsContainer: homePageReducer
});

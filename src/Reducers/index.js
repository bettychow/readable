
import { combineReducers } from 'redux'
import {
  FETCH_POST_BY_ID,
} from '../Actions'

const initialState = {
  post: {},
}

const post = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_POST_BY_ID: {
      return {
        ...state,
        post: action.payload,
      }
    }
    default:
      return state;
  }
}

export default combineReducers({
  post,
})

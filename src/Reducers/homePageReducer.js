import { FETCH_ALL_POSTS } from "../Actions";
import { FETCH_ALL_CATS } from "../Actions";
import { SORT_BY_TIME } from "../Actions";

const initialState = {
  posts: [],
  categories: []
};

const homePageReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case FETCH_ALL_POSTS: {
      const x = action.payload.sort(function(a,b) {
    return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);
    });
      return {
        ...state,
        posts: x
      };
    }
    break
    case SORT_BY_TIME: {
      const newPostsState = Object.assign([], state.posts);
      newPostsState.sort((a,b) => {
      if(a.timestamp > b.timestamp) {
        return -1
      } else if ( a.timestamp < b.timestamp) {
        return 1
      } else {
        return 0
      }
    })
console.log('pppp', newPostsState)
      return {
		    ...state,
	    	posts: newPostsState
      };
    }
    break
    case FETCH_ALL_CATS: {
  
      return {
        ...state,
        categories: action.payload
      };
    }
    break
    default:
      return state;
  }
};

export default homePageReducer;

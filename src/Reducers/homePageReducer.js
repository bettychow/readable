import { FETCH_ALL_POSTS } from "../Actions";
import { FETCH_ALL_CATS } from "../Actions";
import { SORT_BY_TIME_LATEST, SORT_BY_TIME_OLDEST, SORT_BY_SCORE_LOWEST, SORT_BY_SCORE_HIGHEST, DELETE_POST_BY_ID } from "../Actions";

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
    case SORT_BY_TIME_LATEST: {
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

      return {
		    ...state,
	    	posts: newPostsState
      };
    }
    break
    case SORT_BY_TIME_OLDEST: {
      const newPostsState = Object.assign([], state.posts);
      newPostsState.sort((a,b) => {
      if(a.timestamp > b.timestamp) {
        return 1
      } else if ( a.timestamp < b.timestamp) {
        return -1
      } else {
        return 0
      }
    })

      return {
		    ...state,
	    	posts: newPostsState
      };
    }
    break
    
    case SORT_BY_SCORE_HIGHEST: {
      const newPostsState = Object.assign([], state.posts);
      newPostsState.sort((a,b) => {
      if(a.voteScore > b.voteScore) {
        return -1
      } else if ( a.voteScore < b.voteScore) {
        return 1
      } else {
        return 0
      }
    })

      return {
		    ...state,
	    	posts: newPostsState
      };
    }
    break
    case SORT_BY_SCORE_LOWEST: {
      const newPostsState = Object.assign([], state.posts);
      newPostsState.sort((a,b) => {
      if(a.voteScore > b.voteScore) {
        return 1
      } else if ( a.voteScore < b.voteScore) {
        return -1
      } else {
        return 0
      }
    })

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
   /* case DELETE_POST_BY_ID:
      const id = action.payload
      const newPostsState = Object.assign([], state.posts)
    newPostsState.map((post, index) => {
      if (post.id === id) {
        newPostsState.splice(index, 1)
      }
    }) 

   return {
     ...state,
     posts: newPostsState
   }
    break  */
    default:
      return state;
  }
};

export default homePageReducer;

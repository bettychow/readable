import { FETCH_BY_CAT, SORT_BY_TIME_CAT, SORT_BY_SCORE_CAT } from "../Actions";

const initialState = {
  posts: []
};

const postByCatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BY_CAT: {
      const sortedPosts = action.payload.sort((a,b) => {
        return (a.voteScore > b.voteScore) ? -1 : ((a.voteScore < b.voteScore) ? 1 : 0)
      })
      return {
        ...state,
        posts: sortedPosts
      };
    }
    break
    case SORT_BY_TIME_CAT: {
      const newPostsState = Object.assign([], state.posts)
          newPostsState.sort((a,b) => {
        return (a.timestamp > b.timestamp) ? -1 : ((a.timestamp < b.timestamp) ? 1 : 0)
      })
      return {
        ...state,
        posts: newPostsState
      };
    }
    break
    case SORT_BY_SCORE_CAT: {
      const newPostsState = Object.assign([], state.posts)
          newPostsState.sort((a,b) => {
        return (a.voteScore > b.voteScore) ? -1 : ((a.voteScore < b.voteScore) ? 1 : 0)
      })
      return {
        ...state,
        posts: newPostsState
      };
    }
    break
    default: 
      return state
  }
}

export default postByCatReducer;

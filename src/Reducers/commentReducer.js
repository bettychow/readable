import { CREATE_COMMENT, UPDATE_COMMENT, FETCH_ALL_COMMENTS, FETCH_COMMENT_BY_ID, SORT_COM_BY_TIME_LATEST, SORT_COM_BY_TIME_OLDEST, SORT_COM_BY_SCORE_HIGHEST, SORT_COM_BY_SCORE_LOWEST } from "../Actions";

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

    case UPDATE_COMMENT: {
      return {
        ...state,
        comments: action.payload
      };
    }
    break

  case SORT_COM_BY_TIME_LATEST: {
    const newCommentsState = Object.assign( [], state.comments)
    newCommentsState.sort((a,b) => {
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
      comments: newCommentsState
    };
  }

  case SORT_COM_BY_TIME_OLDEST: {
    const newCommentsState = Object.assign( [], state.comments)
    newCommentsState.sort((a,b) => {
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
      comments: newCommentsState
    };
  }

  case SORT_COM_BY_SCORE_HIGHEST: {
    const newCommentsState = Object.assign( [], state.comments)
    newCommentsState.sort((a,b) => {
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
      comments: newCommentsState
    };
  }

  case SORT_COM_BY_SCORE_LOWEST: {
    const newCommentsState = Object.assign( [], state.comments)
    newCommentsState.sort((a,b) => {
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
      comments: newCommentsState
    };
  }
   
    default:
      return state;
  }
};

export default commentReducer;

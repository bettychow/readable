import * as ReadableAPI from "../utils/ReadableAPI";

export const FETCH_POST_BY_ID = "FETCH_POST_BY_ID";
export const FETCH_COMMENT_BY_ID = "FETCH_COMMENT_BY_ID"
export const FETCH_ALL_POSTS = "FETCH_ALL_POSTS";
export const FETCH_ALL_CATS = "FETCH_ALL_CATS";
export const FETCH_POST_BY_CAT = "FETCH_POST_BY_CAT"
export const SORT_BY_TIME_LATEST = "SORT_BY_TIME_LATEST"
export const SORT_BY_TIME_OLDEST = "SORT_BY_TIME_OLDEST"
export const SORT_BY_SCORE_LOWEST = "SORT_BY_SCORE_LOWEST"
export const SORT_BY_SCORE_HIGHEST ="SORT_BY_SCORE_HIGHEST"
export const CREATE_NEW_POST = "CREATE_NEW_POST"
export const DELETE_POST_BY_ID = "DELETE_POST_BY_ID"
export const DELETE_COMMENT_BY_ID ="DELETE_COMMENT_BY_ID"
export const UPDATE_POST = "UPATE_POST"
export const UPDATE_COMMENT = "UPATE_COMMENT"
export const UPVOTE ="UPVOTE"
export const CREATE_COMMENT = "CREATE_COMMENT"
export const FETCH_ALL_COMMENTS = "FETCH_ALL_COMMENTS"
export const FETCH_BY_CAT = "FETCH_BY_CAT"
export const SORT_BY_TIME_CAT = "SORT_BY_TIME_CAT"
export const SORT_BY_SCORE_CAT = "SORT_BY_SCORE_CAT"
export const SORT_COM_BY_TIME_LATEST = "SORT_COM_BY_TIME_LATEST"
export const SORT_COM_BY_TIME_OLDEST = "SORT_COM_BY_TIME_OLDEST"
export const SORT_COM_BY_SCORE_HIGHEST = "SORT_COM_BY_SCORE_HIGHEST"
export const SORT_COM_BY_SCORE_LOWEST = "SORT_COM_BY_SCORE_LOWEST"
export const SORT_POST_BY_TIME_LATEST_CAT = "SORT_POST_BY_TIME_LATEST_CAT"
export const SORT_POST_BY_TIME_OLDEST_CAT = "SORT_POST_BY_TIME_OLDEST_CAT"
export const SORT_POST_BY_SCORE_HIGHEST_CAT = "SORT_POST_BY_SCORE_HIGHEST_CAT"
export const SORT_POST_BY_SCORE_LOWEST_CAT = "SORT_POST_BY_SCORE_LOWEST_CAT"
export const VOTE_COMMENT = "VOTE_COMMENT"

export const createPost = (values) => {
  ReadableAPI.create(values)
  
  return {
    type: CREATE_NEW_POST,
    payload: values
    
  }
}

export const fetchByPostId = id => dispatch => {
  ReadableAPI.getPostById(id)
  .then(post => {
    
     dispatch({ 
       type: FETCH_POST_BY_ID, 
       payload: post
     });
   })
   .catch(err => console.log(err));
};

export const fetchByCat = id => {
  const data = ReadableAPI.getPostByCat(id);

  return {
    type: FETCH_POST_BY_CAT,
    payload: data
  };
};
    
export const fetchCats = () => dispatch => {
  ReadableAPI.getAllCats()
    .then(categories => {
      
      dispatch({ 
        type: FETCH_ALL_CATS, 
        payload: categories
      });
    })
    .catch(err => console.log(err));
};

export const fetchPosts = () => dispatch => {
  ReadableAPI.getAllPosts()
    .then(posts => {
     
      dispatch({ 
        type: FETCH_ALL_POSTS, 
        payload: posts
      });
    })
    .catch(err => console.log(err));
};


export const sortByTime = (value) => {
  if(value === 'latestFirst') {
  return {
    type: SORT_BY_TIME_LATEST,
  }
}
return {
  type: SORT_BY_TIME_OLDEST
}
};

export const sortByScore = (value) => {
  if(value === 'lowestFirst') {
  return {
    type: SORT_BY_SCORE_LOWEST,
  }
}
return {
  type: SORT_BY_SCORE_HIGHEST
}
};

export const deleteByPostId = (id, callback) => {
   ReadableAPI.deletePost(id)
   // .then(() => callback())


  return {
    type: DELETE_POST_BY_ID,
    payload: id
  }
}

export const deleteByCommentId = (id) => {
  ReadableAPI.deleteComment(id)

  return {
    type: DELETE_COMMENT_BY_ID,
    payload: id
  }
}

export const updatePost = (values, id) => {
  ReadableAPI.editPost(id, values)
   //.then(() => callback())
  return {
    type: UPDATE_POST,
    payload: values
  }
}

export const vote = (id, option) => dispatch => {
  
 ReadableAPI.vote(id, option)
 .then(post => {
   dispatch({ 
     type: UPVOTE, 
     payload: post
   });
 })
 .catch(err => console.log(err));
}

export const createComment = values => dispatch => {
   ReadableAPI.createComment(values)
   .then(comment => {
     dispatch({ 
       type: CREATE_COMMENT, 
       payload: comment
     });
   })
   .catch(err => console.log(err));
};
  

export const fetchComments = id => dispatch => {
  ReadableAPI.getAllComments(id)
  .then(comments => {
     dispatch({ 
       type: FETCH_ALL_COMMENTS, 
       payload: comments
     });
   })
   .catch(err => console.log(err));
};

export const fetchCommentById = id => dispatch => {
  ReadableAPI.getCommentById(id)
  .then(comment => {
     dispatch({ 
       type: FETCH_COMMENT_BY_ID, 
       payload: comment
     });
   })
   .catch(err => console.log(err));
};

export const updateComment = (values, id) => dispatch => {
  ReadableAPI.editComment(id, values)
  return {
    type: UPDATE_COMMENT,
    payload: values
  }
  
} 

export const fetchByCategory = category => dispatch => {
  ReadableAPI.getPostsByCat(category)
  .then(posts => {
     dispatch({ 
       type: FETCH_BY_CAT, 
       payload: posts
     });
   })
   .catch(err => console.log(err));
};

export const sortByTimeCat = (value) => {

  if(value === 'latestFirst') {
    return {
      type: SORT_POST_BY_TIME_LATEST_CAT,
    }
  }
  return {
    type: SORT_POST_BY_TIME_OLDEST_CAT
  }
}

export const sortByScoreCat = (value) => {
  
  if(value === 'highestFirst') {
    return {
      type: SORT_POST_BY_SCORE_HIGHEST_CAT,
    }
  }
  return {
    type: SORT_POST_BY_SCORE_LOWEST_CAT
  }
  }

  export const sortCommentsByTime = (value) => {
    if(value === 'latestFirst') {
    return {
      type: SORT_COM_BY_TIME_LATEST,
    }
  }
  return {
    type: SORT_COM_BY_TIME_OLDEST
  }
  };


  export const sortCommentsByScore = (value) => {
    if(value === 'highestFirst') {
    return {
      type: SORT_COM_BY_SCORE_HIGHEST,
    }
  }
  return {
    type: SORT_COM_BY_SCORE_LOWEST
  }
  };

  export const voteComment = (id, option) => dispatch => {
      ReadableAPI.voteComment(id, option)
      .then(comment => {
        dispatch({ 
          type: VOTE_COMMENT, 
          payload: comment
        });
      })
      .catch(err => console.log(err));
     }


  
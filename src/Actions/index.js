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
export const UPVOTE ="UPVOTE"
export const CREATE_COMMENT = "CREATE_COMMENT"
export const FETCH_ALL_COMMENTS = "FETCH_ALL_COMMENTS"
export const FETCH_BY_CAT = "FETCH_BY_CAT"
export const SORT_BY_TIME_CAT = "SORT_BY_TIME_CAT"
export const SORT_BY_SCORE_CAT = "SORT_BY_SCORE_CAT"

export const createPost = (values, callback) => {
  ReadableAPI.create(values)
  .then(() => callback())
  return {
    type: CREATE_NEW_POST,
    payload: values
    
  }
}

export const fetchByPostId = id => dispatch => {
  console.log('id', id)
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

export const updatePost = (values, id, callback) => {
  ReadableAPI.editPost(id, values)
  // .then(() => callback())
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
    console.log('wwwww', comments)
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

/*export const updateComment = (values, id, callback) => {
  ReadableAPI.editPost(id, values)
  // .then(() => callback())
  return {
    type: UPDATE_COMMENT,
    payload: values
  }
} */

export const fetchByCategory = category => dispatch => {
  ReadableAPI.getPostsByCat(category)
  .then(posts => {
    console.log('posts by cat', posts)
     dispatch({ 
       type: FETCH_BY_CAT, 
       payload: posts
     });
   })
   .catch(err => console.log(err));
};

export const sortByTimeCat = () => {

  return {
    type: SORT_BY_TIME_CAT
  }
}

export const sortByScoreCat = () => {
  
    return {
      type: SORT_BY_SCORE_CAT
    }
  }
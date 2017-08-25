import * as ReadableAPI from "../utils/ReadableAPI";

export const FETCH_POST_BY_ID = "FETCH_POST_BY_ID";
export const FETCH_ALL_POSTS = "FETCH_ALL_POSTS";
export const FETCH_ALL_CATS = "FETCH_ALL_CATS";
export const FETCH_POST_BY_CAT = "FETCH_POST_BY_CAT"
export const SORT_BY_TIME = "SORT_BY_TIME"
export const CREATE_NEW_POST = "CREATE_NEW_POST"
export const DELETE_POST_BY_ID = "DELETE_POST_BY_ID"
export const UPDATE_POST = "UPATE_POST"
export const UPVOTE ="UPVOTE"
export const CREATE_COMMENT = "CREATE_COMMENT"
export const FETCH_ALL_COMMENTS = "FETCH_ALL_COMMENTS"
export const FETCH_BY_CATS = "FETCH_BY_CATS"

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


export const sortByTime = () => {
  return {
    type: SORT_BY_TIME,
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

export const updatePost = (values, id, callback) => {
  ReadableAPI.editPost(id, values)
  // .then(() => callback())
  return {
    type: UPDATE_POST,
    payload: values
  }
}

export const upVote = (id, option) => {
  console.log('idddd', id)
  console.log('option', option)
  console.log('kkkk', ReadableAPI.upVote(id))

  return {
    type: UPVOTE,
    payload: id
  }
}

export const createComment = values => {
  console.log('sss', values)
  console.log('rrrr', ReadableAPI.createComment(values))
  
  return {
    type: CREATE_COMMENT,
    payload: values
  }
}

export const fetchComments = id => dispatch => {
  ReadableAPI.getAllComments(id)
  .then(comments => {
    console.log(comments)
     dispatch({ 
       type: FETCH_ALL_COMMENTS, 
       payload: comments
     });
   })
   .catch(err => console.log(err));
};
  
export const fetchByCategory = category => dispatch => {
  ReadableAPI.getPostsByCat(category)
  .then(posts => {
    console.log(posts)
     dispatch({ 
       type: FETCH_BY_CATS, 
       payload: posts
     });
   })
   .catch(err => console.log(err));
};
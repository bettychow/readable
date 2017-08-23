import * as ReadableAPI from "../utils/ReadableAPI";

export const FETCH_POST_BY_ID = "FETCH_POST_BY_ID";
export const FETCH_ALL_POSTS = "FETCH_ALL_POSTS";
export const FETCH_ALL_CATS = "FETCH_ALL_CATS";
export const SORT_BY_TIME = "SORT_BY_TIME"
export const CREATE_NEW_POST = "CREATE_NEW_POST"

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
    type: FETCH_POST_BY_ID,
    payload: data
  };
};
    
export const fetchCats = () => dispatch => {
  ReadableAPI.getAllCats()
    .then(categories => {
      console.log('ccccccccc', categories)
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



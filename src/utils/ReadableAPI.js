const api = process.env.REACT_APP_CONTACTS_API_URL || "http://localhost:5001";

const headers = {
  Accept: "application/json",
  Authorization: "ABC123abc"
};

export const getAllCats = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => {
      const data = res.json();  
      console.log('this is the getAll ' , data ) 
      return data;
    })
    
export const create = body =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(res => res.json());

export const getPostById = id =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getPostByCat = () =>
  fetch(`${api}/category/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const deletePost = id =>
  fetch(`${api}/posts/${id}`, { 
    method: "DELETE", 
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
    })

export const editPost = (id, post) => 
  fetch(`${api}/posts/${id}`, {
    method: "PUT", 
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })

  export const upVote = (id) => 
    fetch(`${api}/posts/${id}`, {
      method: "POST", 
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {option: "upVote"}
      )
    })
    .then(res => res.json())


  export const createComment = body => 
  fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(res => res.json());

  export const getAllComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => {
    const data = res.json();  
    return data;
  })

  export const getPostsByCat = category => 
  fetch(`${api}/${category}/posts`, { headers })
  .then(res => {
    const data = res.json();  
    return data;
  })
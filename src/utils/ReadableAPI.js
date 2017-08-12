const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5001'


const headers = {
  'Accept': 'application/json',
  'Authorization': "ABC123abc"
}

export const getAllCat = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

 export const create = (body) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

  export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)


  export const getPostByCat = () =>
  fetch(`${api}/category/posts`, { headers })
    .then(res => res.json())
    .then(data => data)


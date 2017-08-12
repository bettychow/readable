import * as ReadableAPI from '../utils/ReadableAPI'

export const FETCH_POST_BY_ID = 'FETCH_POST_BY_ID'

export const fetchByPostId = id => {
  const data = ReadableAPI.getPostById(id);

  console.log('data', data)
  return {
    type: FETCH_POST_BY_ID,
    payload: data,
  }
}

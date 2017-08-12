import * as ReadableAPI from '../utils/ReadableAPI'

export const FETCH_POST_BY_ID = 'FETCH_POST_BY_ID'

export const fetchByPostId = id => {
  const data = ReadableAPI.getPostById(id);
  return {
    type: FETCH_POST_BY_ID,
    payload: data,
  }
}

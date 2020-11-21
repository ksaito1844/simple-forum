import axios from 'axios';

const baseUrl = '/api/comments';

const getPostComments = async (postId) => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getPostComments };

import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000`;

const responseBody = (response) => response.data;


const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
  };
  
  const Post = {
    create: () =>
      requests.post('posts', {  }),
    list: () => requests.get('posts'),
    comments:(id)=>requests.get(`posts/${id}/comments`),
    delete: (id) => requests.delete(`posts/${id}`),
    update: (id) => requests.put(`posts/${id}`),
  };

  
  const agent = { Post };
  
  export default agent;

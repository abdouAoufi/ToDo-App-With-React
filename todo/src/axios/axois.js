import axios from 'axios';

const instance = axios.create({
   baseURL: "https://jsonplaceholder.typicode.com/comments/",
 });
  
 export default instance ;
 import axios from 'axios'

 const instance = axios.create({
    baseURL: 'https://prometheus-backend.herokuapp.com/api/'
 });

 export default instance;
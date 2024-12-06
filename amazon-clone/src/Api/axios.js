import axios from "axios";

const axiosInstance = axios.create({
  //baseURL:"http://127.0.0.1:5001/clone-20a21/us-central1/api"
  baseURL:"https://api-suax6uly4q-uc.a.run.app",
  
})

export {axiosInstance}
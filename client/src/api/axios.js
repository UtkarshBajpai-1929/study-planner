import axios from "axios";
const API= axios.create({
  baseURL :`https://study-planner-s2qt.onrender.com`,
  withCredentials: true
});

export default API;
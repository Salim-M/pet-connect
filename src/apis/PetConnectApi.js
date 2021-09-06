import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8000/api/v1",
  baseURL: "https://petconnect-v1.herokuapp.com/api/v1",
  timeout: 50000,
});

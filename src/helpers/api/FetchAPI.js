import axios from "axios";

const FetchAPI = axios.create({
  baseURL: "/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS, PATCH",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default FetchAPI;

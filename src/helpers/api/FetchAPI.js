import axios from "axios";

const FetchAPI = axios.create({
  baseURL: "http://192.168.1.102:8080/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
    Accept: "application/json",
  },
});

export default FetchAPI;

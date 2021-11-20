import axios from "axios";

export const Api = axios.create({
  baseURL: "https://bico-app-api.herokuapp.com/"
})
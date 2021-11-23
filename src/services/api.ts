import axios from "axios";

export const Api = axios.create({
  baseURL: "https://bico-app-api.herokuapp.com/"
  // baseURL: "http://localhost:3001/"
})

export const ApiLocate = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/"
})
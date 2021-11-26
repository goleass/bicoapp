import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

export const Api = axios.create({
  baseURL: "https://bico-app-api.herokuapp.com/"
  // baseURL: "http://localhost:3001/"
})

export const ApiLocate = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/"
})

Api.interceptors.request.use(
  (config:any) => {
    const user = getUserLocalStorage()

    const token = `Barer ${user?.token}`

    config.headers.Authorization = token

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
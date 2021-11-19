import { Api } from "../../services/api";
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("u")

  if (!json) {
    return null;
  }

  const user = JSON.parse(json)

  return user ?? null;
}

export async function RegisterRequest(fistName: string, lastName: string, email: string, password: string) {
  try {
    const request = await Api.post('auth/register', { first_name:fistName, last_name:lastName, email, password });

    return request.data
  } catch (error) {
    return null;
  }
}

export async function LoginRequest(email: string, password: string) {
  try {
    const request = await Api.post('auth/authenticate', { email, password });

    return request.data
  } catch (error) {
    return null;
  }
}
import { LoginFormFields } from "../../models/zod/LoginSchema";
import { apiRoutes } from "../../routes/apiRoutes";
import { APIError } from "../errors/errorTypes";
import apiRequest from "./apiRequest";

export async function loginAPI(loginForm: LoginFormFields) {
  try {
    const response = await fetch(apiRoutes.users.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
      credentials: "include",
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new APIError(message, response.status);
    }

    const data = await response.json();
    console.log("Login successful: ", data);
    return data;
  } catch (error) {
    console.error(
      "A problem occurred with logging in user " + loginForm.username,
      error
    );

    if (error instanceof APIError) throw error;
    throw Error("Network error");
  }
}

export async function logoutAPI() {
  const data = await apiRequest(apiRoutes.users.logout, {
    method: "POST",
  });
  console.log("User logged out: ", data);
  return data;
}

export async function hydrateAPI() {
  const data = await apiRequest(apiRoutes.users.hydrate)
  console.log("User session hydrated: ", data)
  return data;
}
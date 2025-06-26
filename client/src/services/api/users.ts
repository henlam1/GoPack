import { LoginFormFields } from "../../models/zod/LoginSchema";
import { apiRoutes } from "../../routes/apiRoutes";
import APIError from "../errors/errorTypes";

export async function loginAPI(loginForm: LoginFormFields) {
  try {
    const response = await fetch(apiRoutes.users.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
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
      "A problem occured with logging in user " + loginForm.username,
      error
    );
    // We needed a clear separation of API errors and network errors
    // How will our messages display differently?
    // Do we need an APIError class?
    if (error instanceof APIError) {
      throw error;
    } else {
      throw Error("Network error");
    }
  }
}

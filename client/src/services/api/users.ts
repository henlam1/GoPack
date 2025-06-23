import { LoginFormFields } from "../../models/zod/LoginSchema";
import { apiRoutes } from "../../routes/apiRoutes";

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
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Login successful: ", data);
    return data;
  } catch (error) {
    console.error(
      "A problem occured with logging in user " + loginForm.username,
      error
    );
  }
}

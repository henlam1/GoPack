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

    const statusCode = await response.status;

    const resp = {
      "status": statusCode,
      "data": statusCode == 200 ? await response.json(): {},
      "message": await response.text()
    }
    return resp;
  } catch (error) {
    console.error(
      "An unexpected problem occured with logging in user " + loginForm.username,
      error
    );
  }
}

// Utility function to wrap API requests and handle token refreshes

import { apiRoutes } from "../../routes/apiRoutes";
import { isNetworkError } from "../errors/errorHelpers";
import { APIError, TokenError, NetworkError } from "../errors/errorTypes";

const apiRequest = async (url: string, options: Partial<RequestInit> = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    });

    // If unauthorized, try to refresh token
    if (response.status === 401) {
      const refreshResponse = await fetch(apiRoutes.tokens.refresh, {
        method: "POST",
        credentials: "include",
      });

      // If our token is refreshed, retry the request
      if (refreshResponse.ok) {
        return apiRequest(url, options);
      }

      // If our token wasn't refreshed, re-direct user to login and get a new refresh token
      window.location.href = "/login";
      throw new TokenError("Session expired. Please log in again");
    }

    // Throw API error
    if (!response.ok) {
      const { message } = await response.json();
      throw new APIError(message, response.status);
    }

    return response.json();
  } catch (error) {
    if (isNetworkError(error)) {
      throw new NetworkError("A network error occurred", error)
    }

    // Rethrown errors like APIError or TokenError
    throw error;
  }
};

export default apiRequest;

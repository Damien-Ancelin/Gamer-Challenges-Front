import { describe, expect, it } from "vitest";
import { errorHandler } from "./errorHandler";

const API_URL = "http://localhost:3000";

const authLogin = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const status = response.status;
    const errorData = await response.json();
    throw new Error(`Error ${status}: ${errorData.message}`);
  }

  return response.json();
};

describe("authLogin", () => {
  it("should return user data on successful login", async () => {
    const userData = await authLogin("test@mail.io", "Test_1234");
    expect(userData).toEqual({
      message: "Utilisateur connecté avec succès",
      success: true,
    });
  });

  it("should throw an error on failed login", async () => {
    await expect(authLogin("wrong", "wrong")).rejects.toThrow(
      "Error 400: Couple email/mot de passe incorrect"
    );
  });
});

const getUserData = async () => {
  const response = await fetch(`${API_URL}/api/account/user`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const status = response.status;
    const errorData = await response.json();
    const errorMessage = errorHandler({ status, errorData });

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
};

describe("getUserData", () => {
  it("shouldn't return user data because access token is not set", async () => {
    await expect(getUserData()).rejects.toThrow(
      "Error 401: Vous n'êtes pas autorisé à accéder à cette ressource"
    );
  });
});

import { describe, expect, it } from "vitest";

describe("authLogin", () => {
  it("should return user data on successful login", async () => {
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
    const userData = await authLogin("test@mail.io", "Test_1234");
      expect(userData).toEqual({
        message: "Utilisateur connecté avec succès",
        success: true,
      });
    });

  it("should throw an error on failed login", async () => {
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

    await expect(authLogin('wrong', 'wrong'))
    .rejects.toThrow('Error 400: Couple email/mot de passe incorrect');
  })
});

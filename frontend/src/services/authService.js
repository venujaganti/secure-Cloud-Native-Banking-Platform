import api from "./api";

const authService = {
  async login(email, password) {
    const response = await api.post("/auth/login", {
      email,
      password
    });

    if (response?.accessToken) {
      localStorage.setItem(
        "accessToken",
        response.accessToken
      );
    }

    return response;
  },

  logout() {
    localStorage.removeItem("accessToken");
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem("accessToken"));
  },

  async me() {
    return api.get("/auth/me");
  }
};

export default authService;
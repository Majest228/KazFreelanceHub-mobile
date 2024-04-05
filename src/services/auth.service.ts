import { $apiWithToken, $apiWithoutToken } from "../api/api.interceptor";

export const AuthService = {
  async login(email: string, password: string) {
    const res = await $apiWithoutToken.post("auth/login", {
      email: email,
      password: password,
    });
    return res.data;
  },
  async register(email: string, password: string, login: string, role: number) {
    const res = await $apiWithoutToken.post("auth/register", {
      email: email,
      password: password,
      login,
      role,
    });

    return res.data;
  },
  //   async checkAuth() {
  //     const refreshToken = await Cookies.get("refreshToken");
  //     const res = await $apiWithoutToken.post("auth/login/access-token", {
  //       refreshToken,
  //     });
  //     if (res.data.accessToken) {
  //       localStorage.setItem(
  //         "usernames",
  //         JSON.stringify({
  //           id: res.data.id,
  //           email: res.data.email,
  //           role: res.data.role,
  //         })
  //       );
  //       Cookies.set("accessToken", res.data.accessToken, {
  //         expires: 1 / (24 * 60),
  //         path: "/",
  //       });
  //       Cookies.set("refreshToken", res.data.refreshToken, {
  //         expires: 7,
  //         path: "/",
  //       });
  //     }
  //     return res;
  //   },
};

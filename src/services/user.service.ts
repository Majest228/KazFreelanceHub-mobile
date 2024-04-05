import { IUser } from "./../interfaces/user.interface";
import axios, { AxiosResponse } from "axios";
import { URL } from "../consts/ip";
export const UserService = {
  async getProfile(accessToken: any) {
    const res = await axios.get(`${URL}/user/profile`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  },
  async getById(id: number): Promise<IUser> {
    const res = await axios.get<IUser>(`${URL}/user/profile/${id}`);
    return res.data;
  },
};

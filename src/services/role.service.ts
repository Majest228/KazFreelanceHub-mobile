import axios from "axios";
import { IRole } from "../interfaces/role.interface";
import { URL } from "../consts/ip";

export const RoleService = {
  async getAllRole() {
    const res = await axios.get<IRole[]>(`${URL}/role/all`);

    return res.data;
  },
};

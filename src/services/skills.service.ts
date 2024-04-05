import axios from "axios";
import { IRole } from "../interfaces/role.interface";
import { URL } from "../consts/ip";

export const SkillsService = {
  async getAllSkills() {
    const res = await axios.get(`${URL}/skills/allSkills`);

    return res.data;
  },

  async createSkills(skill: string) {
    const res = await axios.post(`${URL}/skills/create`, { skill });

    return res.data;
  },
};

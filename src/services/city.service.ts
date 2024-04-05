import axios from "axios";
import { URL } from "../consts/ip";

export const CityService = {
  async getRegiions() {
    const res = await axios.get(`${URL}/city/get-regions`);
    return res.data;
  },
  async getCities(id: number) {
    const res = await axios.get(`${URL}/city/get-cities/${id}`);
    return res.data;
  },
  async getCityById(id: number | any) {
    const res = await axios.get(`${URL}/city/get-by-id/${id}`);
    return res.data;
  },
};

import axios from "axios";
import { IFreelancers } from "../interfaces/freelancer.interface";
import { URL } from "../consts/ip";

export const FreelancerService = {
  async getAllFreelancer(
    limit: number = 10,
    page: number = 1,
    searchText = ""
  ) {
    const res = await axios.get<IFreelancers>(
      `${URL}/user/freelancers?limit=${limit}&page=${page}&searchText=${searchText}`
    );
    await new Promise((r) => setTimeout(r, 500));
    return res.data;
  },
  async getAllCustomers(limit: number = 10, page: number = 1, searchText = "") {
    const res = await axios.get<IFreelancers>(
      `${URL}/user/customers?limit=${limit}&page=${page}&searchText=${searchText}`
    );
    await new Promise((r) => setTimeout(r, 500));
    return res.data;
  },
};

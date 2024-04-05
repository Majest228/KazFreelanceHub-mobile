import axios from "axios";
import { IOrder } from "../interfaces/order.interface";
import { URL } from "../consts/ip";

export const OrderService = {
  async getAllOrder(
    limit: number = 100,
    page: number = 1,
    searchText = "",
    filters: Array<any> | string = []
  ) {
    const res = await axios.get(
      `${URL}/order/get-all?limit=${limit}&page=${page}&searchText=${searchText}&filters=${filters}`
    );
    await new Promise((r) => setTimeout(r, 500));
    return res.data;
  },
  async getById(id: number) {
    const res = await axios.get<IOrder>(`${URL}/order/by/${id}`);
    return res.data;
  },
};

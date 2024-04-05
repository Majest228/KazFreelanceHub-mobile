import { IProfessionToOrder } from "./order.interface";

export interface IFreelancer {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  login: string;
  password: string;
  phone: string;
  dateBorn: any;
  avatarPath: string;
  name: string;
  surname: string;
  title: string;
  smallDescription: string;
  description: string;
  cv: string;
  rating: number;
  cityId: number;
  regionId: number;
  roleId: number;
  ProfessionToUser: IProfessionToOrder[];
}

export interface IFreelancers {
  items: IFreelancer[];
  total_pages?: any;
  total_items?: number;
}

export interface IFreelancerDescription {
  name: string;
  surname: string;
  smallDescription: string;
  id: number;
  dateBorn: any;
}

import { IProfessionToOrder } from "./order.interface";

export interface IUser {
  id?: number;
  email?: string;
  login?: string | any;
  password?: string;
  phone?: string;
  dateBorn?: string;
  avatarPath?: any;
  name: string;
  surname: string;
  title?: string;
  createdAt?: any;
  smallDescription?: string;
  description?: string | TrustedHTML;
  cv?: string;
  rating?: number;
  cityId?: number | any;
  roleId?: number | any;
  regionId?: number;
  ProfessionToUser?: IProfessionToOrder[];
  lastOnlineTime?: any;
  param?: number;
  status?: boolean;
}

export interface IFreelancerAvatar {
  login?: string;
  avatarPath?: string;
  border: number;
}

export interface IFreelancerAbout {
  isLoading: boolean;
  description: string | any;
}

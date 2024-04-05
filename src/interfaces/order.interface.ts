import { ChangeEvent } from "react";

export interface IOrder {
  id?: number | any;
  createdAt?: Date | any;
  updatedAt?: Date;
  title?: string | any;
  description?: any;
  price?: string | any;
  views?: number;
  response?: number | any;
  ownerId?: any;
  status?: any;
  OrderFile?: IOrderFile[];
  ResponseToOrder?: IResponseToOrder[];
  ProfessionToOrder?: IProfessionToOrder[];
  statusTransaction?: boolean;
  isOpenPayment?: any;
  setIsOpenPayment?: any;
  checkIdToOwner?: any;
}

export interface IProfessionObject {
  nameEn: string;
  nameKz: string;
  nameRu: string;
  value: string;
  children: Array<any>;
}

export interface IProfessionToOrder {
  Profession: IProfessionObject;
}

export interface IResponseToOrder {
  id?: number;
  comment?: string;
  createdAt?: string;
  price?: number;
  priceWithCommission?: string;
  term?: number;
  typeCommission?: string;
  updatedAt?: string;
  responderId?: number;
}

export interface IOrderFile {
  file: string;
}
export interface IOrderFiles {
  OrderFile: IOrderFile[];
}
export interface IOrderCreate {
  title: string;
  description: string;
  price: number;
  files: Array<any>;
  professionId: number;
}

export enum TypeCommission {
  client = "client",
  freelancer = "freelancer",
}

export interface IOrderRequest {
  handleOptionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedOption: "client" | "freelancer" | string | null | any;
  setDay: Function;
  setMoney: Function;
  setComment: Function;
  day: number;
  money: number;
  comment: string;
  refetch: any;
}

export interface IOrders {
  total_page: number;
  items: IOrder[];
}

export interface IResponder {
  AcceptResponseToOrder: any;
  ProfessionToUser: any;
  avatarPath: string;
  cityId: number;
  createdAt: any;
  cv: string;
  dateBorn: string;
  description: string;
  email: string;
  fromUser: any;
  id: number;
  login: string;
  name: string;
  password: string;
  phone: string;
  rating: number;
  regionId: number;
  smallDescription: string;
  surname: string;
  title: string;
}

export interface IOrderResponse {
  comment: string;
  createdAt: any;
  id: number;
  orderId: number;
  price: number;
  priceWithCommission: string;
  responder: IResponder;
  term: number;
  typeCommission: "client" | "freelancer";
}

export interface IOrderResponseItem {
  createdAt: any;
  avatarPath: string;
  name: string;
  surname: string;
  price: number;
  term: number;
  login: string;
  comment: string;
  cityId: number;
  dateBorn: string;
  responserId: number | any;
  owner: number | any;
  orderId: number | any;
  status: any;
  type: "created" | "process";
  refetchResponser?: any;
  refetchAccess?: any;
  refetchOrder?: any;
  id?: any;
}

export interface ICreateResponseToOrder {
  term: number;
  price: number;
  typeCommission: "client" | "freelancer";
  priceWithCommission: number;
  comment: string;
}

export interface IOrder {
  id?: number | any;
  createdAt?: Date | any;
  updatedAt?: Date;
  title?: string | any;
  description?: any;
  price?: string | any;
  views?: number;
  response?: number | any;
  ownerId?: any;
  status?: any;
  OrderFile?: IOrderFile[];
  ResponseToOrder?: IResponseToOrder[];
  ProfessionToOrder?: IProfessionToOrder[];
  statusTransaction?: boolean;
  isOpenPayment?: any;
  setIsOpenPayment?: any;
  checkIdToOwner?: any;
}

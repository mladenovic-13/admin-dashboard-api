export interface IUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  address: string;
  phone: string;
  img: string;
  country: string;
}
// Product type
export interface IProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  stock: string;
  price: number;
  total: number;
}
// Order type
export interface IOrder {
  id: string;
  product: string;
  amount: number;
  method: string;
  status: string;
  userID: string;
  total: number;
}

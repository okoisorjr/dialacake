import { Cakes } from "./cakes";
import { User } from "./user";

export class OrderList {
  id!: string;
  user!: User;
  cake!: Cakes;
  layers!: string;
  specialMessage!: string;
  deliveryStatus!: string;
  birthdayCard!: boolean;
  wine!: boolean;
  flavour!: string;
  cakeCount: number = 1;
  grandPrice!: number;
  topperImage?: boolean;
  tx_ref!: string | null;
  flw_ref!: string | null;
  chargedAmount!: number | null;
  transactionId!: number | null;
  paymentStatus!: string | null;
  createdAt!: string;
  updatedAt!: string;
}

export class Order {
  user_id?: string;
  user?: string | null;
  user_email?: string | null;
  user_phone?: string | null; 
  cake!: string;
  cakeName!:string;
  cakeImageURL!: string;
  cakeCategory!: string;
  cakeId!: string;
  layers!: string;
  specialMessage!: string;
  /* colorPreference!: string; */
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
}

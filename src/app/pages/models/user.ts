export class User {
  id?: string;
  fullname?: string | null;
  email?: string | null;
  phone?: string | null; 
  address?: Address = new Address();
  verified?: boolean;
}

export class Address {
  state?: string;
  country?: string;
  city?: string;
  street?: string;
}

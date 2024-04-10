//* Interfaces
export interface GuitarI {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface CartItem extends GuitarI {
  quantity: number;
}

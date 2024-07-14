// Define the types for product and price history
export interface PriceHistory {
  price: number;
  date: string;
}

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  price_history: PriceHistory[];
}
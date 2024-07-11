// Define the types for product and price history
interface PriceHistory {
  price: number;
  date: string;
}

interface Product {
  id: number;
  nombre: string;
  precio: number;
  price_history: PriceHistory[];
}
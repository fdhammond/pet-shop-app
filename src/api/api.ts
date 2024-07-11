// src/api/api.ts

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

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:3000/products'); // Adjust port if necessary
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data;
};

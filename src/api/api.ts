// src/api/api.ts
import { Product } from '../types/types';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:3000/products'); // Adjust port if necessary
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data;
};

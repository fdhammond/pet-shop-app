import { Product } from '../types/types';

// Fetch products function (already defined)
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:3000/products'); // Adjust port if necessary
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data;
};

// Update product function
export const updateProduct = async (productId: string, updatedProductData: Partial<Product>): Promise<void> => {
  const response = await fetch(`http://localhost:3000/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProductData),
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }
};

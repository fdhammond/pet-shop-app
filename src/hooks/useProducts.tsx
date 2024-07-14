import { useState, useEffect } from 'react';
import { Product } from '../types/types';
import { fetchProducts } from '../api/api';

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductsData = async () => {
    try {
      const data: Product[] = await fetchProducts();
        setProducts(data);
        console.log(data);

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (productId: string) => {
    try {
      console.log('Fetching product with ID:', productId);

      // Find the product in the products array
      const parsedProductId = parseInt(productId);
      const product: Product | undefined = products.find(p => p.id === parsedProductId);

      console.log('Found product:', product);

      if (product) {
        return product;
      } else {
        throw new Error(`Product with ID ${productId} not found`);
      }
    } catch (err) {
      setError((err as Error).message);
      throw err; // Re-throw the error to handle in the component
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return { products, loading, error, fetchProductsData, fetchProductById  };
}

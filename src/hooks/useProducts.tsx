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

  useEffect(() => {
    fetchProductsData();
  }, []);

  return { products, loading, error, fetchProductsData };
}

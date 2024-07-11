import React, { useEffect, useState } from 'react';
import { fetchProducts } from './api/api';
import './App.css';

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

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data: Product[] = await fetchProducts();
        console.log(data);

        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.nombre}</h2>
            <p>Price: ${product.precio}</p>
            <h3>Price History</h3>
            <ul>
              {product.price_history.map((history, index) => (
                <li key={index}>
                  <p>Price: ${history.price}</p>
                  <p>Date: {new Date(history.date).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

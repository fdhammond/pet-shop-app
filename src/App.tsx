import React, { useEffect, useState } from 'react';
import { fetchProducts } from './api/api';
import Table from './components/Table';
import './App.css';

const App: React.FC = () => {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const data: Product[] = await fetchProducts();
  //       console.log(data);

  //       setProducts(data);
  //     } catch (err) {
  //       setError((err as Error).message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getProducts();
  // }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <Table />
    </div>
  );
};

export default App;

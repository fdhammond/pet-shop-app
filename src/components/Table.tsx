import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/api';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PriceHistoryRenderer from './PriceHistoryRenderer'; // Import the custom cell renderer

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

const Table: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const columnDefs = [
    { headerName: 'Nombre', field: 'nombre', flex: 1 },
    { headerName: 'Precio', field: 'precio', flex: 1 },
    {
      headerName: 'Historial de Precios',
      field: 'price_history',
      flex: 2,
      cellRenderer: PriceHistoryRenderer // Use custom cell renderer
    }
  ];

  // Function to fetch products
  const fetchProductsData = async () => {
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

  // Initial fetch on component mount
  useEffect(() => {
    fetchProductsData();
  }, []);

  // Polling mechanism: Fetch products every 30 seconds
    useEffect(() => {
    const intervalInMilliseconds: number = 10 * 60 * 1000;
    const interval = setInterval(() => {
      fetchProductsData();
    }, intervalInMilliseconds); // Adjust interval as needed

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

    // Function to dynamically set row height based on content
  const getRowHeight = () => {
    // Example logic: Adjust height based on content in price_history column
    const numberOfLines = 2; // Adjust this logic as per your requirement
    return 25 + 20 * numberOfLines; // Calculate the height based on your content
  };


  return (
    <>
      <h1>Products</h1>
      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
            rowData={products}
            columnDefs={columnDefs}
            frameworkComponents={{ priceHistoryRenderer: PriceHistoryRenderer }} // Register the custom cell renderer
            getRowHeight={getRowHeight} // Set the row height dynamically
        />
      </div>
    </>
  );
};

export default Table;

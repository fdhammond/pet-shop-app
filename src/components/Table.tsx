import React, { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PriceHistoryRenderer from './PriceHistoryRenderer'; // Import the custom cell renderer
import CalculateOneWeekPrice from './CalculateOneWeekPrice';
import useProducts from '../hooks/useProducts';

const Table: React.FC = () => {
  const { products, loading, error, fetchProductsData } = useProducts();

  const columnDefs = [
    { headerName: 'Nombre', field: 'nombre', flex: 1 },
    { headerName: 'Precio', field: 'precio', flex: 1 },
    {
      headerName: 'Ultimo Precio',
      field: 'price_history',
      flex: 2,
      cellRenderer: PriceHistoryRenderer, // Use custom cell renderer
    },
    {
      headerName: 'Diferencia de Precio 1 Semana',
      field: 'price_history',
      flex: 2,
      cellRenderer: CalculateOneWeekPrice, // Use custom cell renderer
    },
  ];

  // Polling mechanism: Fetch products every 10 minutes
  useEffect(() => {
    const intervalInMilliseconds: number = 10 * 60 * 1000;
    const interval = setInterval(() => {
      fetchProductsData();
    }, intervalInMilliseconds);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [fetchProductsData]);

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
          frameworkComponents={{
            priceHistoryRenderer: PriceHistoryRenderer,
            calculateOneWeekPrice: CalculateOneWeekPrice,
          }} // Register the custom cell renderers
          getRowHeight={getRowHeight} // Set the row height dynamically
        />
      </div>
    </>
  );
};

export default Table;

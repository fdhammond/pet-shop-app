import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PriceHistoryRenderer from './PriceHistoryRenderer';
import CalculateOneWeekPrice from './CalculateOneWeekPrice';
import EditButton from './EditButton';
import useProducts from '../hooks/useProducts';

const Table: React.FC = () => {
  const { products, loading, error } = useProducts();

  const columnDefs = [
    { headerName: 'Nombre', field: 'nombre', flex: 1 },
    { headerName: 'Precio', field: 'precio', flex: 1 },
    {
      headerName: 'Ultimo Precio',
      field: 'price_history',
      flex: 2,
      cellRenderer: PriceHistoryRenderer,
    },
    {
      headerName: 'Diferencia de Precio 1 Semana',
      field: 'price_history',
      flex: 2,
      cellRenderer: CalculateOneWeekPrice,
    },
    {
      headerName: 'Edit',
      field: 'id',
      flex: 1,
      cellRenderer: (params) => <EditButton id={params.data.id} />, // Ensure EditButton is rendered correctly
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to dynamically set row height based on content
  const getRowHeight = () => {
    const numberOfLines = 2;
    return 25 + 20 * numberOfLines;
  };

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={products}
          columnDefs={columnDefs}
          frameworkComponents={{
            editButton: EditButton,
            priceHistoryRenderer: PriceHistoryRenderer,
            calculateOneWeekPrice: CalculateOneWeekPrice,
          }}
          getRowHeight={getRowHeight}
        />
      </div>
    </>
  );
};

export default Table;

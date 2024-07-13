import React from 'react';

interface PriceHistory {
  price: number;
  date: string;
}

interface PriceHistoryRendererProps {
  value: PriceHistory[];
}

const PriceHistoryRenderer: React.FC<PriceHistoryRendererProps> = ({ value }) => {
  // Function to get the latest price from the price history
  const getLatestPrice = (priceHistory: PriceHistory[]): number | null => {
    if (priceHistory.length === 0) return null;
    // Sort by date descending to get the latest price
    const sortedHistory = priceHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sortedHistory[0].price;
  };

  const latestPrice = getLatestPrice(value);

  return (
    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
      {latestPrice !== null ? (
        <>
          <p style={{ marginBottom: '5px' }}>Ultimo Precio: ${latestPrice}</p>
          <p style={{ paddingLeft: '5px', marginBottom: '5px' }}>//</p>
          <p style={{ color: '#888', paddingLeft: '5px', marginBottom: '5px' }}>Ultimo Update: {new Date(value[0].date).toLocaleString()}</p> {/* Assuming the first item is the latest */}
        </>
      ) : (
        <p>No price history available</p>
      )}
    </div>
  );
};

export default PriceHistoryRenderer;

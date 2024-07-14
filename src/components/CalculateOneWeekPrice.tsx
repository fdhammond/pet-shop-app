import React from "react";

interface PriceHistory {
  price: number;
  date: string;
}

interface PriceOneWeekDifferenceProps {
  value: PriceHistory[];
}

const CalculateOneWeekPrice: React.FC<PriceOneWeekDifferenceProps> = ({ value }) => {
  const getLatestPrice = (priceHistory: PriceHistory[]): number | null => {
    if (priceHistory.length === 0) return null;
    const sortedHistory = priceHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return sortedHistory[0].price;
  };

  const getPriceOneWeekAgo = (priceHistory: PriceHistory[]): number | null => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    let closestPrice: number | null = null;
    let closestDateDiff = Infinity;

    priceHistory.forEach(entry => {
      const entryDate = new Date(entry.date);
      const dateDiff = Math.abs(oneWeekAgo.getTime() - entryDate.getTime());

      if (dateDiff < closestDateDiff) {
        closestDateDiff = dateDiff;
        closestPrice = entry.price;
      }
    });

    return closestPrice;
  };

  const latestPrice = getLatestPrice(value);
  const priceOneWeekAgo = getPriceOneWeekAgo(value);
  const priceDifference = latestPrice !== null && priceOneWeekAgo !== null ? latestPrice - priceOneWeekAgo : null;

  return (
    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
      {latestPrice !== null ? (
        <>
          <p style={{ marginBottom: '5px' }}>Último Precio: ${latestPrice}</p>
          <p style={{ paddingLeft: '5px', marginBottom: '5px' }}>//</p>
          {priceDifference !== null && (
            <>
              <p style={{ marginLeft: '10px', marginBottom: '5px' }}>Diferencia de Precio (1 semana): ${priceDifference}</p>
            </>
          )}
        </>
      ) : (
        <p>No hay historial de precios disponible</p>
      )}
    </div>
  );
};

export default CalculateOneWeekPrice;

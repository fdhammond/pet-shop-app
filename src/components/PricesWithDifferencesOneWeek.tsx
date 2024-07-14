import React from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import useProducts from '../hooks/useProducts';

export default function PricesWithDifferencesOneWeek() {
    const { products, loading, error, fetchProductsData } = useProducts();

    // Calcula la diferencia de precio de una semana para cada producto
    const calculateOneWeekDifference = (currentPrice: number, priceHistory: { price: number; date: string }[]): number | null => {
        if (priceHistory.length === 0) return null;

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
        const result = closestPrice !== null ? currentPrice - closestPrice : null;
        if (result === null) return null
        return parseFloat(result.toFixed(2));
    };

    const calculateOneWeekPrice = (priceHistory: { price: number; date: string }[]) => {
        if (priceHistory.length === 0) return null;
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const closestPrice = priceHistory.find(entry => new Date(entry.date) > oneWeekAgo)?.price;
        if (closestPrice === undefined) return null;
        return parseFloat(closestPrice.toFixed(2));
    };

    // Filtra los productos y calcula las diferencias
    const filteredProducts = products.map(product => ({
        ...product,
        priceDifferenceOneWeek: calculateOneWeekDifference(product.precio, product.price_history),
        priceOneWeek: calculateOneWeekPrice(product.price_history)
    }))
    .filter(product => product.priceDifferenceOneWeek !== null)
    .sort((a, b) => b.priceDifferenceOneWeek! - a.priceDifferenceOneWeek!)
    .slice(0, 50); // Show top 10 products with greatest differences

    const columnDefs = [
        { headerName: 'Nombre', field: 'nombre', flex: 1 },
        { headerName: 'Precio', field: 'precio', flex: 1 },
        { headerName: 'Diferencia de Precio 1 Semana', field: 'priceDifferenceOneWeek', flex: 1 },
        { headerName: 'Precio 1 semana atras', field: 'priceOneWeek', flex: 1 }
    ];


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Function to dynamically set row height based on content
    const getRowHeight = () => {
        // Example logic: Adjust height based on content in price_history column
        const numberOfLines = 2; // Adjust this logic as per your requirement
        return 25 + 20 * numberOfLines; // Calculate the height based on your content
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                rowData={filteredProducts}
                columnDefs={columnDefs}
                getRowHeight={getRowHeight} // Set the row height dynamically
            />
        </div>
    );
}

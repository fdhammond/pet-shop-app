import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct } from '../api/api';
import { Product } from '../types/types';
import useProducts from '../hooks/useProducts';

const EditProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { fetchProductById, products, loading: productsLoading } = useProducts(); // Destructure fetchProductById and products from useProducts
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Wait for products to be fetched before finding the product by ID
        await fetchProductById(productId!);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, fetchProductById]);

  // Update local product state when products are fetched
  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(productId!));
    setProduct(foundProduct || null);
  }, [products, productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Adjust based on the type of 'precio' in your Product type
    const newValue = name === 'precio' ? parseFloat(value) : value;

    setProduct((prevProduct) => ({
      ...prevProduct!,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      try {
        await updateProduct(product.id.toString(), product);
        navigate('/');
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  if (productsLoading) return <p>Loading products...</p>; // Display a loading indicator while products are being fetched
  if (loading) return <p>Loading product...</p>; // Display a loading indicator while the specific product is being fetched
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre:
          <input type="text" name="nombre" value={product.nombre} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label>
          Precio:
          <input type="number" name="precio" value={product.precio} onChange={handleInputChange} />
        </label>
      </div>
      {/* Add other fields as needed */}
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProduct;

// src/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const productListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
};

const productStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center',
  width: '200px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const imageStyle = {
  borderRadius: '8px',
  width: '100px',
  height: '100px',
  objectFit: 'cover',
};

const h2Style = {
  fontSize: '18px',
  margin: '0',
  color: '#333',
};

const pStyle = {
  margin: '8px 0',
  color: '#666',
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={containerStyle}>
      <h1>Product List</h1>
      <div style={productListStyle}>
        {products.map((product) => (
          <div key={product.id} style={productStyle}>
            <h2 style={h2Style}>{product.title}</h2>
            <p style={pStyle}>{product.description}</p>
            <p style={pStyle}>${product.price}</p>
            <img src={product.image} alt={product.title} style={imageStyle} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

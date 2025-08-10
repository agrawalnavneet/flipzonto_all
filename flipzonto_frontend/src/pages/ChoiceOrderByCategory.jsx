import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const categories = ['Chocolate', 'Drinks', 'Snacks'];

const ChoiceOrderByCategory = () => {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);

  const fetchProducts = async (category) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:5000/api/products/${category}/${shopId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(res.data);
  };

  return (
    <div>
      <Navbar />
      <h2>Select Category</h2>
      {categories.map(cat => (
        <button key={cat} onClick={() => fetchProducts(cat)}>{cat}</button>
      ))}

      <div style={{ marginTop: 20 }}>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
            <h4>{p.name}</h4>
            <p>Price: ₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoiceOrderByCategory;

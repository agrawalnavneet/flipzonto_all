import React, { useEffect, useState } from "react";
import "./AllProducts.css"; // Optional, or inline styling can be used

const categories = [
  {
    name: "chocolate",
    image: "https://media-hosting.imagekit.io/953acbec70f941de/choclate1.png?tr=w-500",
  },
  // Add more categories as needed
];

const AllProducts = ({ shopDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || categories[0].name
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async (category) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/${category}/api`);
      if (!response.ok) throw new Error("Failed to fetch products.");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
    loadProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>
        Place Order for {shopDetails.shopName}
      </h1>

      <div className="shop-info-card">
        <p><strong>Shop Name:</strong> {shopDetails.shopName}</p>
        <p><strong>Contact:</strong> {shopDetails.contact}</p>
        <p><strong>Owner:</strong> {shopDetails.shopOwnerName}</p>
        <p>
          <strong>Location:</strong>{" "}
          <a href={shopDetails.location} target="_blank" rel="noopener noreferrer">
            View on the location
          </a>
        </p>
        <p><strong>Address:</strong> {shopDetails.address}</p>
      </div>

      <div className="category-container">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="category-item"
            onClick={() => setSelectedCategory(cat.name)}
            style={{
              borderBottom: selectedCategory === cat.name ? "3px solid #003087" : "none",
            }}
          >
            <img src={cat.image} alt={cat.name} />
            <span>{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</span>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="product-list">
          <h2>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products</h2>
          {products.map((item) => (
            <div className="product-card" key={item._id}>
              <img src={item.image} alt={item.name} />
              <div className="product-details">
                <h3>{item.name}</h3>
                <span style={{ color: "red" }}>MRP ₹{item.MRP}</span>
                <br />
                <span style={{ color: "green" }}>
                  <strong>Rate:</strong> ₹{item.rate}
                </span>
                <p>Total Weight: {item.total_weight}</p>
                <div className="actions">
                  <input type="number" min="1" defaultValue="1" />
                  <button>Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;

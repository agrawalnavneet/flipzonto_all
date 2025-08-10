// API
// http://localhost:3000/api/shops/north-mon/680324c1bc9a31c85196e931

// YE API AK SINGLE PRODUCT KO LE AA RAHA HAIN

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./ChooseProductAndAddToCart.css";
// import Navbar from "../components/Navbar";

// const ChooseProductAndAddToCart = () => {
//   const { region, shopId } = useParams();
//   const [shop, setShop] = useState(null);
//   const [salesmanName, setSalesmanName] = useState("");
//   const [category, setCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchShopDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://fzt-api-frilu457.onrender.com/api/shops/${region}/${shopId}`
//         );
//         const data = await response.json();
//         setShop(data.shop);
//       } catch (error) {
//         console.error("Error fetching shop details:", error);
//       }
//     };

//     fetchShopDetails();

//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setSalesmanName(parsedUser.salesman_name);
//       } catch (e) {
//         console.error("Failed to parse user JSON:", e);
//       }
//     }
//   }, [region, shopId]);

//   const loadCategory = async (cat) => {
//     setCategory(cat);
//     setLoading(true);
//     setProducts([]);
//     try {
//       const apiUrl = `http://localhost:3001/${cat}/api`;
//       const res = await fetch(apiUrl);
//       if (!res.ok) throw new Error("Failed to fetch products.");
//       const items = await res.json();
//       setProducts(items);
//     } catch (error) {
//       console.error(error.message);
//       alert("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   async function addToCart(id, name, image, MRP, rate, category, availableJar) {
//     try {
//       const qtyInput = document.getElementById(`qty-${id}`);
//       const quantity = parseInt(qtyInput.value);

//       if (isNaN(quantity) || quantity <= 0) {
//         alert("Please enter a valid quantity");
//         return;
//       }
//       if (quantity > availableJar) {
//         alert("Quantity exceeds available stock");
//         return;
//       }

//       const response = await fetch(`http://localhost:3001/api/order/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ qty: quantity }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update product quantity on server");
//       }

//       let cart = JSON.parse(localStorage.getItem("cart")) || [];
//       const existingProductIndex = cart.findIndex((item) => item.id === id);

//       if (existingProductIndex !== -1) {
//         cart[existingProductIndex].quantity += quantity;
//       } else {
//         cart.push({ id, name, image, MRP, rate, category, quantity });
//       }
//       localStorage.setItem("cart", JSON.stringify(cart));

//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product._id === id
//             ? { ...product, available_jar: product.available_jar - quantity }
//             : product
//         )
//       );

//       alert(`${name} added to cart successfully!`);
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       alert("Error adding product to cart. Please try again.");
//     }
//   }

//   return (
//     <>
//       <Navbar />

//       {!shop ? (
//         <p style={{ textAlign: "center", marginTop: "2rem" }}>
//           Loading shop details...
//         </p>
//       ) : (
//         <>
//           <h2 className="welcome-text">Welcome, Team {salesmanName || "Guest"}!</h2>

//           <div className="shop-card1">
//             <img
//               src={shop.imageUrl}
//               alt={shop.shopName}
//               className="shop-image1"
//             />
//             <div className="shop-details1">
//               <h3 className="shop-name1">{shop.shopName}</h3>
//               <p>
//                 <strong>Owner:</strong> {shop.shopOwnerName}
//               </p>
//               <p>
//                 <strong>Contact:</strong> {shop.contact}
//               </p>
//               <p>
//                 <strong>Address:</strong> {shop.address}
//               </p>
//               <p>
//                 <strong>Location:</strong>{" "}
//                 <a
//                   href={shop.location}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="shop-location-link"
//                 >
//                   View
//                 </a>
//               </p>
//             </div>
//           </div>
//           <div className="category-container">
//             <button onClick={() => loadCategory("chocolate")}>Chocolate</button>
//             <button onClick={() => loadCategory("biscuit")}>Biscuit</button>
//             <button onClick={() => loadCategory("drinks")}>Drinks</button>
//           </div>

//           {category && (
//             <h2 className="category-title">
//               {category.charAt(0).toUpperCase() + category.slice(1)} And Drinks Products
//             </h2>
//           )}

//           {loading && <p>Loading products...</p>}

//           <div id="products" className="products-container">
//             {products.map((item) => (
//               <div key={item._id} className="product-card">
//                 <div className="product-image-container">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="product-image"
//                   />
//                 </div>
//                 <div className="product-details">
//                   <h3>{item.name}</h3>
//                   <span className="product-mrp">MRP ₹{item.MRP}</span>
//                   <br />
//                   <span className="product-rate">
//                     <strong>Rate:</strong> ₹{item.rate}
//                   </span>
//                   <br />
//                   <p className="product-weight">
//                     Total Weight: {item.total_weight}
//                   </p>
//                   {item.available_jar > 0 ? (
//                     <p className="product-availability">
//                       <strong>Available:</strong>{" "}
//                       <span className="available-stock">
//                         {item.available_jar}
//                       </span>
//                     </p>
//                   ) : (
//                     <p className="product-availability out-of-stock">
//                       Out of Stock
//                     </p>
//                   )}
//                   <div className="product-actions">
//                     <input
//                       type="number"
//                       min="1"
//                       max={item.available_jar}
//                       defaultValue={1}
//                       disabled={item.available_jar === 0}
//                       id={`qty-${item._id}`}
//                       className="quantity-input"
//                     />
//                     <button
//                       id={`add-to-cart-${item._id}`}
//                       onClick={() =>
//                         addToCart(
//                           item._id,
//                           item.name,
//                           item.image,
//                           item.MRP,
//                           item.rate,
//                           category,
//                           item.available_jar
//                         )
//                       }
//                       disabled={item.available_jar === 0}
//                       className={`add-to-cart-button ${
//                         item.available_jar === 0 ? "out-of-stock" : ""
//                       }`}
//                     >
//                       {item.available_jar === 0
//                         ? "Out of Stock"
//                         : "Add to Cart"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default ChooseProductAndAddToCart;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./ChooseProductAndAddToCart.css";
// import Navbar from "../components/Navbar";

// const ChooseProductAndAddToCart = () => {
//   const { region, shopId } = useParams();
//   const [shop, setShop] = useState(null);
//   const [salesmanName, setSalesmanName] = useState("");
//   const [category, setCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // State to control zoomed image modal
//   const [showZoomedImage, setShowZoomedImage] = useState(false);
//   const [zoomedImageSrc, setZoomedImageSrc] = useState("");

//   // Fetching shop details
//   useEffect(() => {
//     const fetchShopDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://fzt-api-frilu457.onrender.com/api/shops/${region}/${shopId}`
//         );
//         const data = await response.json();
//         setShop(data.shop);
//       } catch (error) {
//         console.error("Error fetching shop details:", error);
//       }
//     };

//     fetchShopDetails();

//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setSalesmanName(parsedUser.salesman_name);
//       } catch (e) {
//         console.error("Failed to parse user JSON:", e);
//       }
//     }
//   }, [region, shopId]);

//   // Load products by category
//   const loadCategory = async (cat) => {
//     setCategory(cat);
//     setLoading(true);
//     setProducts([]);
//     try {
//       const apiUrl = `https://b-to-b-apixvuzum.onrender.com/${cat}/api`;
//       const res = await fetch(apiUrl);
//       if (!res.ok) throw new Error("Failed to fetch products.");
//       const items = await res.json();
//       setProducts(items);
//     } catch (error) {
//       console.error(error.message);
//       alert("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle the image click to show the zoomed version
//   const handleImageClick = (imageSrc) => {
//     setZoomedImageSrc(imageSrc);
//     setShowZoomedImage(true);
//   };

//   // Function to close the zoomed image modal
//   const closeZoomModal = () => {
//     setShowZoomedImage(false);
//     setZoomedImageSrc("");
//   };

//   // Add product to cart logic
//   async function addToCart(id, name, image, MRP, rate, category, availableJar) {
//     try {
//       const qtyInput = document.getElementById(`qty-${id}`);
//       const quantity = parseInt(qtyInput.value);

//       if (isNaN(quantity) || quantity <= 0) {
//         alert("Please enter a valid quantity");
//         return;
//       }
//       if (quantity > availableJar) {
//         alert("Quantity exceeds available stock");
//         return;
//       }

//       const response = await fetch(`https://b-to-b-apixvuzum.onrender.com/api/order/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ qty: quantity }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update product quantity on server");
//       }

//       let cart = JSON.parse(localStorage.getItem("cart")) || [];
//       const existingProductIndex = cart.findIndex((item) => item.id === id);

//       if (existingProductIndex !== -1) {
//         cart[existingProductIndex].quantity += quantity;
//       } else {
//         cart.push({ id, name, image, MRP, rate, category, quantity });
//       }
//       localStorage.setItem("cart", JSON.stringify(cart));

//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product._id === id
//             ? { ...product, available_jar: product.available_jar - quantity }
//             : product
//         )
//       );

//       alert(`${name} added to cart successfully!`);
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       alert("Error adding product to cart. Please try again.");
//     }
//   }

//   return (
//     <>
//       {/* Zoom Modal */}
//       {showZoomedImage && (
//         <div className="zoom-modal" onClick={closeZoomModal}>
//           <button className="close-zoom-button" onClick={closeZoomModal}>
//             &times;
//           </button>
//           <img src={zoomedImageSrc} alt="Zoomed" className="zoomed-image" />
//         </div>
//       )}

//       <Navbar />

//       {!shop ? (
//         <p style={{ textAlign: "center", marginTop: "2rem" }}>
//           Loading shop details...
//         </p>
//       ) : (
//         <>
//           <h2 className="welcome-text">Welcome, Team {salesmanName || "Guest"}!</h2>

//           <div className="shop-card1">
//             <img
//               src={shop.imageUrl}
//               alt={shop.shopName}
//               className="shop-image1"
//             />
//             <div className="shop-details1">
//               <h3 className="shop-name1">{shop.shopName}</h3>
//               <p>
//                 <strong>Owner:</strong> {shop.shopOwnerName}
//               </p>
//               <p>
//                 <strong>Contact:</strong> {shop.contact}
//               </p>
//               <p>
//                 <strong>Address:</strong> {shop.address}
//               </p>
//               <p>
//                 <strong>Location:</strong>{" "}
//                 <a
//                   href={shop.location}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="shop-location-link"
//                 >
//                   View
//                 </a>
//               </p>
//             </div>
//           </div>

//           <div className="category-container">
//             <button onClick={() => loadCategory("chocolate")}>Chocolate/All</button>
//             <button onClick={() => loadCategory("biscuit")}>Biscuit</button>
//             <button onClick={() => loadCategory("drinks")}>working...</button>
//           </div>

//           {category && (
//             <h2 className="category-title">
//               {category.charAt(0).toUpperCase() + category.slice(1)} Products
//             </h2>
//           )}

//           {loading && <p>Loading products...</p>}

//           <div id="products" className="products-container">
//             {products.map((item) => (
//               <div key={item._id} className="product-card">
//                 <div className="product-image-container">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="product-image"
//                     onClick={() => handleImageClick(item.image)} // Trigger zoom on image click
//                   />
//                 </div>
//                 <div className="product-details">
//                   <h3>{item.name}</h3>
//                   <span className="product-mrp">MRP ₹{item.MRP}</span>
//                   <br />
//                   <span className="product-rate">
//                     <strong>Rate:</strong> ₹{item.rate}
//                   </span>
//                   <br />
//                   <p className="product-weight">Total Weight: {item.total_weight}</p>
//                   {item.available_jar > 0 ? (
//                     <p className="product-availability">
//                       <strong>Available:</strong>{" "}
//                       <span className="available-stock">{item.available_jar}</span>
//                     </p>
//                   ) : (
//                     <p className="product-availability out-of-stock">
//                       Out of Stock
//                     </p>
//                   )}
//                   <div className="product-actions">
//                     <input
//                       type="number"
//                       min="1"
//                       max={item.available_jar}
//                       defaultValue={1}
//                       disabled={item.available_jar === 0}
//                       id={`qty-${item._id}`}
//                       className="quantity-input"
//                     />
//                     <button
//                       id={`add-to-cart-${item._id}`}
//                       onClick={() =>
//                         addToCart(
//                           item._id,
//                           item.name,
//                           item.image,
//                           item.MRP,
//                           item.rate,
//                           category,
//                           item.available_jar
//                         )
//                       }
//                       disabled={item.available_jar === 0}
//                       className={`add-to-cart-button ${
//                         item.available_jar === 0 ? "out-of-stock" : ""
//                       }`}
//                     >
//                       {item.available_jar === 0 ? "Out of Stock" : "Add to Cart"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default ChooseProductAndAddToCart;

// UPPAR WALA JO CODE HAIN USME ONLY BUISCUITE ADD TO CART NHIN HO RAHA

//NICHE WALA CODE MAIN BISCUITE ADD TO CART HO RAHA HAIN lwkin data base main biscute ka quentity nhin
//reduce ho raha. or order v ho raha.

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./ChooseProductAndAddToCart.css";
// import Navbar from "../components/Navbar";

// const ChooseProductAndAddToCart = () => {
//   const { region, shopId } = useParams();
//   const [shop, setShop] = useState(null);
//   const [salesmanName, setSalesmanName] = useState("");
//   const [category, setCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // State to control zoomed image modal
//   const [showZoomedImage, setShowZoomedImage] = useState(false);
//   const [zoomedImageSrc, setZoomedImageSrc] = useState("");

//   // Fetching shop details
//   useEffect(() => {
//     const fetchShopDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://fzt-api-frilu457.onrender.com/api/shops/${region}/${shopId}`
//         );
//         const data = await response.json();
//         setShop(data.shop);
//       } catch (error) {
//         console.error("Error fetching shop details:", error);
//       }
//     };

//     fetchShopDetails();

//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setSalesmanName(parsedUser.salesman_name);
//       } catch (e) {
//         console.error("Failed to parse user JSON:", e);
//       }
//     }
//   }, [region, shopId]);

//   // Load products by category
//   // Load products by category
// const loadCategory = async (cat) => {
//   setCategory(cat);
//   setLoading(true);
//   setProducts([]); // Reset products when loading a new category
//   try {
//     const apiUrl = `https://b-to-b-apixvuzum.onrender.com/${cat}/api`; // Corrected endpoint URL
//     console.log("Fetching from:", apiUrl);  // Debugging line to check the URL

//     const res = await fetch(apiUrl);

//     if (!res.ok) {
//       throw new Error("Failed to fetch products. Status: " + res.status);
//     }

//     const items = await res.json();
//     console.log("Fetched products:", items); // Debugging line to see the response

//     if (Array.isArray(items) && items.length > 0) {
//       setProducts(items);
//     } else {
//       alert("No products found for this category.");
//     }
//   } catch (error) {
//     console.error("Error loading products:", error.message);
//     alert("Failed to load products.");
//   } finally {
//     setLoading(false);
//   }
// };

//   // Function to handle the image click to show the zoomed version
//   const handleImageClick = (imageSrc) => {
//     setZoomedImageSrc(imageSrc);
//     setShowZoomedImage(true);
//   };

//   // Function to close the zoomed image modal
//   const closeZoomModal = () => {
//     setShowZoomedImage(false);
//     setZoomedImageSrc("");
//   };

//   // Add product to cart logic
//   async function addToCart(id, name, image, MRP, rate, category, availableJar) {
//     console.log("Adding to cart:", id, name, image, MRP, rate, category, availableJar); // Debugging log
//     try {
//       const qtyInput = document.getElementById(`qty-${id}`);
//       const quantity = parseInt(qtyInput.value);

//       if (isNaN(quantity) || quantity <= 0) {
//         alert("Please enter a valid quantity");
//         return;
//       }
//       if (quantity > availableJar) {
//         alert("Quantity exceeds available stock");
//         return;
//       }

//       // Update cart with the product quantity
//       let cart = JSON.parse(localStorage.getItem("cart")) || [];
//       const existingProductIndex = cart.findIndex((item) => item.id === id);

//       if (existingProductIndex !== -1) {
//         cart[existingProductIndex].quantity += quantity;
//       } else {
//         cart.push({ id, name, image, MRP, rate, category, quantity });
//       }
//       localStorage.setItem("cart", JSON.stringify(cart));

//       // Optimistically update product availability
//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product._id === id
//             ? { ...product, available_jar: product.available_jar - quantity }
//             : product
//         )
//       );

//       // Server call to update cart
//       const response = await fetch(
//         `https://b-to-b-apixvuzum.onrender.com/api/order/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ qty: quantity }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update product quantity on server");
//       }

//       alert(`${name} added to cart successfully!`);
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       alert("Error adding product to cart. Please try again.");
//     }
//   }

//   return (
//     <>
//       {/* Zoom Modal */}
//       {showZoomedImage && (
//         <div className="zoom-modal" onClick={closeZoomModal}>
//           <button className="close-zoom-button" onClick={closeZoomModal}>
//             &times;
//           </button>
//           <img src={zoomedImageSrc} alt="Zoomed" className="zoomed-image" />
//         </div>
//       )}

//       <Navbar />

//       {!shop ? (
//         <p style={{ textAlign: "center", marginTop: "2rem" }}>
//           Loading shop details...
//         </p>
//       ) : (
//         <>
//           <h2 className="welcome-text">Welcome, Team {salesmanName || "Guest"}!</h2>

//           <div className="shop-card1">
//             <img
//               src={shop.imageUrl}
//               alt={shop.shopName}
//               className="shop-image1"
//             />
//             <div className="shop-details1">
//               <h3 className="shop-name1">{shop.shopName}</h3>
//               <p>
//                 <strong>Owner:</strong> {shop.shopOwnerName}
//               </p>
//               <p>
//                 <strong>Contact:</strong> {shop.contact}
//               </p>
//               <p>
//                 <strong>Address:</strong> {shop.address}
//               </p>
//               <p>
//                 <strong>Location:</strong>{" "}
//                 <a
//                   href={shop.location}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="shop-location-link"
//                 >
//                   View
//                 </a>
//               </p>
//             </div>
//           </div>

//           <div className="category-container">
//             <button onClick={() => loadCategory("chocolate")}>Chocolate/All</button>
//             <button onClick={() => loadCategory("biscuit")}>Biscuit</button>
//             <button onClick={() => loadCategory("drinks")}>Drinks</button>
//           </div>

//           {category && (
//             <h2 className="category-title">
//               {category.charAt(0).toUpperCase() + category.slice(1)} Products
//             </h2>
//           )}

//           {loading && <p>Loading products...</p>}

//           <div id="products" className="products-container">
//             {products.map((item) => (
//               <div key={item._id} className="product-card">
//                 <div className="product-image-container">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="product-image"
//                     onClick={() => handleImageClick(item.image)} // Trigger zoom on image click
//                   />
//                 </div>
//                 <div className="product-details">
//                   <h3>{item.name}</h3>
//                   <span className="product-mrp">MRP ₹{item.MRP}</span>
//                   <br />
//                   <span className="product-rate">
//                     <strong>Rate:</strong> ₹{item.rate}
//                   </span>
//                   <br />
//                   <p className="product-weight">Total Weight: {item.total_weight}</p>
//                   {item.available_jar > 0 ? (
//                     <p className="product-availability">
//                       <strong>Available:</strong>{" "}
//                       <span className="available-stock">{item.available_jar}</span>
//                     </p>
//                   ) : (
//                     <p className="product-availability out-of-stock">
//                       Out of Stock
//                     </p>
//                   )}
//                   <div className="product-actions">
//                     <input
//                       type="number"
//                       min="1"
//                       max={item.available_jar}
//                       defaultValue={1}
//                       disabled={item.available_jar === 0}
//                       id={`qty-${item._id}`}
//                       className="quantity-input"
//                     />
//                     <button
//                       id={`add-to-cart-${item._id}`}
//                       onClick={() =>
//                         addToCart(
//                           item._id,
//                           item.name,
//                           item.image,
//                           item.MRP,
//                           item.rate,
//                           category,
//                           item.available_jar
//                         )
//                       }
//                       disabled={item.available_jar === 0}
//                       className={`add-to-cart-button ${item.available_jar === 0 ? "out-of-stock" : ""}`}
//                     >
//                       {item.available_jar === 0 ? "Out of Stock" : "Add to Cart"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default ChooseProductAndAddToCart;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./ChooseProductAndAddToCart.css";
// import Navbar from "../components/Navbar";
// import PullToRefresh from "../components/PullToRefresh";

// const ChooseProductAndAddToCart = () => {
//   const { region, shopId } = useParams();
//   const [shop, setShop] = useState(null);
//   const [salesmanName, setSalesmanName] = useState("");
//   const [category, setCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // State to control zoomed image modal
//   const [showZoomedImage, setShowZoomedImage] = useState(false);
//   const [zoomedImageSrc, setZoomedImageSrc] = useState("");

//   // Fetching shop details
//   useEffect(() => {
//     const fetchShopDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://fzt-api-frilu457.onrender.com/api/shops/${region}/${shopId}`
//         );
//         const data = await response.json();
//         setShop(data.shop);
//       } catch (error) {
//         console.error("Error fetching shop details:", error);
//       }
//     };

//     fetchShopDetails();

//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setSalesmanName(parsedUser.salesman_name);
//       } catch (e) {
//         console.error("Failed to parse user JSON:", e);
//       }
//     }
//   }, [region, shopId]);

//   // Load products by category
//   const loadCategory = async (cat) => {
//     setCategory(cat);
//     setLoading(true);
//     setProducts([]); // Reset products when loading a new category
//     try {
//       const apiUrl = `https://b-to-b-apixvuzum.onrender.com/${cat}/api`; // Corrected endpoint URL
//       console.log("Fetching from:", apiUrl); // Debugging line to check the URL

//       const res = await fetch(apiUrl);

//       if (!res.ok) {
//         throw new Error("Failed to fetch products. Status: " + res.status);
//       }

//       const items = await res.json();
//       console.log("Fetched products:", items); // Debugging line to see the response

//       if (Array.isArray(items) && items.length > 0) {
//         setProducts(items);
//       } else {
//         alert("No products found for this category.");
//       }
//     } catch (error) {
//       console.error("Error loading products:", error.message);
//       alert("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle the image click to show the zoomed version
//   const handleImageClick = (imageSrc) => {
//     setZoomedImageSrc(imageSrc);
//     setShowZoomedImage(true);
//   };

//   // Function to close the zoomed image modal
//   const closeZoomModal = () => {
//     setShowZoomedImage(false);
//     setZoomedImageSrc("");
//   };

//   // Add product to cart logic
//   async function addToCart(id, name, image, MRP, rate, category, availableJar) {
//     console.log(
//       "Adding to cart:",
//       id,
//       name,
//       image,
//       MRP,
//       rate,
//       category,
//       availableJar
//     ); // Debugging log
//     try {
//       const qtyInput = document.getElementById(`qty-${id}`);
//       const quantity = parseInt(qtyInput.value);

//       if (isNaN(quantity) || quantity <= 0) {
//         alert("Please enter a valid quantity");
//         return;
//       }
//       if (quantity > availableJar) {
//         alert("Quantity exceeds available stock");
//         return;
//       }

//       // Update cart in localStorage
//       let cart = JSON.parse(localStorage.getItem("cart")) || [];
//       const existingProductIndex = cart.findIndex((item) => item.id === id);

//       if (existingProductIndex !== -1) {
//         cart[existingProductIndex].quantity += quantity;
//       } else {
//         cart.push({ id, name, image, MRP, rate, category, quantity });
//       }
//       localStorage.setItem("cart", JSON.stringify(cart));

//       // Optimistically update product availability in the UI
//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product._id === id
//             ? { ...product, available_jar: product.available_jar - quantity }
//             : product
//         )
//       );

//       // Use dynamic category path in API request
//       const response = await fetch(
//         `https://b-to-b-apixvuzum.onrender.com/${category}/api/order/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ qty: quantity }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update product quantity on server");
//       }

//       // alert(`${name} added to cart successfully!`);
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       alert("Error adding product to cart. Please try again.");
//     }
//   }

//   return (
//     <>
//       {/* Zoom Modal */}
//       {showZoomedImage && (
//         <div className="zoom-modal" onClick={closeZoomModal}>
//           <button className="close-zoom-button" onClick={closeZoomModal}>
//             &times;
//           </button>
//           <img src={zoomedImageSrc} alt="Zoomed" className="zoomed-image" />
//         </div>
//       )}

//       <Navbar />

//       {!shop ? (
//         <p style={{ textAlign: "center", marginTop: "4rem" }}>
//           Loading shop details...
//         </p>
//       ) : (
//         <>
//           <PullToRefresh>
//             <h3 className="welcome-text">
//               Welcome, Team name : {salesmanName || "Guest"}
//             </h3>

//             <div className="shop-card1">
//               <img
//                 src={shop.imageUrl}
//                 alt={shop.shopName}
//                 className="shop-image1"
//               />
//               <div className="shop-details1">
//                 <h3 className="shop-name1">{shop.shopName}</h3>
//                 <p>
//                   <strong>Owner:</strong> {shop.shopOwnerName}
//                 </p>
//                 <p>
//                   <strong>Contact:</strong> {shop.contact}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {shop.address}
//                 </p>
//                 <p>
//                   <strong>Location:</strong>{" "}
//                   <a
//                     href={shop.location}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="shop-location-link"
//                   >
//                     View
//                   </a>
//                 </p>
//               </div>
//             </div>

//             <div className="category-grid">
//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("babycare")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/babycare%20-%20Copy.png?updatedAt=1747907167863"
//                   alt="BabyCare"
//                 />
//                 <span>BabyCare</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("biscuit")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/buscuit1%20-%20Copy.png?updatedAt=1747740287264"
//                   alt="Biscuit"
//                 />
//                 <span>Biscuit</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("bathingsoap")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/bathingsoap1.png?updatedAt=1747897456879"
//                   alt="Bathing soap img"
//                 />
//                 <span>Bathing Soap</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("chocolate")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(28).png?updatedAt=1747740886211"
//                   alt="Chocolate"
//                 />
//                 <span>Chocolate</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("colddrink")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/colddrink.png?updatedAt=1747742323502"
//                   alt="Drinks"
//                 />
//                 <span> Cold Drinks</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("detergentbar")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(62).png?updatedAt=1747745565824"
//                   alt="DetergentBar"
//                 />
//                 <span>DetergentBar</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("detergentpowder")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/detergentbar1.png?updatedAt=1747847727622"
//                   alt="DetergentPowder"
//                 />
//                 <span>Detergent Powder</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("kirana")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/kirana.png?updatedAt=1747744923722"
//                   alt="Kirana"
//                 />
//                 <span>Kirana</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("napkin")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/napkins.png?updatedAt=1747901777431"
//                   alt="Kirana"
//                 />
//                 <span>Napkin & Pads</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("noodles")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/Noodles1%20-%20Copy.png?updatedAt=1747848853884"
//                   alt="Noodles"
//                 />
//                 <span>Noodles</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("personalcare")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/personalcare%20-%20Copy.png?updatedAt=1747907611637"
//                   alt="Personal Care"
//                 />
//                 <span>Personal Care</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("oil")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/oil_hair.png?updatedAt=1747744210410"
//                   alt="Oil"
//                 />
//                 <span>Hair Oil</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("shampoo")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(64).png?updatedAt=1747747526981"
//                   alt="Shampoo"
//                 />
//                 <span>Shampoo</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("tea")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/tea1.png?updatedAt=1747901413976"
//                   alt="Tea"
//                 />
//                 <span>Tea & Coffe</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("toothpaste")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/tothpaste1%20-%20Copy.png?updatedAt=1747897453528"
//                   alt="ToothPaste"
//                 />
//                 <span>ToothPaste</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("snack")}
//               >
//                 <img
//                   src="https://ik.imagekit.io/secqprmji/snaks%20-%20Copy.png?updatedAt=1747884468953"
//                   alt="Snack"
//                 />
//                 <span>Snack</span>
//               </button>

//               <button
//                 className="category-button"
//                 onClick={() => loadCategory("other")}
//               >
//                 <img src="/images/other.png" alt="Others" />
//                 <span>Others</span>
//               </button>
//             </div>

//             {category && (
//               <h3 className="category-title">
//                 {category.charAt(0).toUpperCase() + category.slice(1)} Products
//               </h3>
//             )}

//             {loading && <p>Loading products...</p>}

//             <div id="products" className="products-container">
//               {products.map((item) => (
//                 <div key={item._id} className="product-card">
//                   <div className="product-image-container">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="product-image"
//                       onClick={() => handleImageClick(item.image)} // Trigger zoom on image click
//                     />
//                   </div>
//                   <div className="product-details">
//                     <h3>{item.name}</h3>
//                     <span className="product-mrp">MRP ₹{item.MRP}</span>
//                     <br />
//                     <span className="product-rate">
//                       <strong>Rate:</strong> ₹{item.rate}
//                     </span>
//                     <br />
//                     <p className="product-weight">
//                       Total Weight: {item.total_weight}
//                     </p>
//                     {item.available_jar > 0 ? (
//                       <p className="product-availability">
//                         <strong>Available:</strong>{" "}
//                         <span className="available-stock">
//                           {item.available_jar}
//                         </span>
//                       </p>
//                     ) : (
//                       <p className="product-availability out-of-stock">
//                         Out of Stock
//                       </p>
//                     )}
//                     <div className="product-actions">
//                       <input
//                         type="number"
//                         min="1"
//                         max={item.available_jar}
//                         defaultValue={1}
//                         disabled={item.available_jar === 0}
//                         id={`qty-${item._id}`}
//                         className="quantity-input"
//                       />
//                       <button
//                         id={`add-to-cart-${item._id}`}
//                         onClick={() =>
//                           addToCart(
//                             item._id,
//                             item.name,
//                             item.image,
//                             item.MRP,
//                             item.rate,
//                             category,
//                             item.available_jar
//                           )
//                         }
//                         disabled={item.available_jar === 0}
//                         className={`add-to-cart-button ${
//                           item.available_jar === 0 ? "out-of-stock" : ""
//                         }`}
//                       >
//                         {item.available_jar === 0
//                           ? "Out of Stock"
//                           : "Add to Cart"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </PullToRefresh>
//           {/* New Div for bottom page content */}
//           <div className="bottom-page-info">
//             <p>....bottom page...</p>
//             {/* Add more content here to test scrolling */}
//             <p>This is some additional content to make the div scrollable.</p>
//             <p>You can add a lot more text or elements here.</p>

//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default ChooseProductAndAddToCart;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./ChooseProductAndAddToCart.css";
// import Navbar from "../components/Navbar";
// // import StickySearchBar from "../components/StickySearchBar";
// import PullToRefresh from "../components/PullToRefresh";

// import ButtonNav from "../components/BottomNav";
// const ChooseProductAndAddToCart = () => {
//   const { region, shopId } = useParams();
//   const [shop, setShop] = useState(null);
//   const [salesmanName, setSalesmanName] = useState("");
//   const [category, setCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // State to control zoomed image modal
//   const [showZoomedImage, setShowZoomedImage] = useState(false);
//   const [zoomedImageSrc, setZoomedImageSrc] = useState("");

//   // Fetching shop details
//   useEffect(() => {
//     const fetchShopDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://fzt-api-frilu457.onrender.com/api/shops/${region}/${shopId}`
//         );
//         const data = await response.json();
//         setShop(data.shop);
//       } catch (error) {
//         console.error("Error fetching shop details:", error);
//       }
//     };

//     fetchShopDetails();

//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setSalesmanName(parsedUser.salesman_name);
//       } catch (e) {
//         console.error("Failed to parse user JSON:", e);
//       }
//     }
//   }, [region, shopId]);

//   // Load products by category
//   // Load products by category
//   const loadCategory = async (cat) => {
//     setCategory(cat);
//     setLoading(true);
//     setProducts([]); // Reset products when loading a new category
//     try {
//       const apiUrl = `https://b-to-b-apixvuzum.onrender.com/${cat}/api`; // Corrected endpoint URL
//       console.log("Fetching from:", apiUrl); // Debugging line to check the URL

//       const res = await fetch(apiUrl);

//       if (!res.ok) {
//         throw new Error("Failed to fetch products. Status: " + res.status);
//       }

//       const items = await res.json();
//       console.log("Fetched products:", items); // Debugging line to see the response

//       if (Array.isArray(items) && items.length > 0) {
//         setProducts(items);
//       } else {
//         alert("No products found for this category.");
//       }
//     } catch (error) {
//       console.error("Error loading products:", error.message);
//       alert("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle the image click to show the zoomed version
//   const handleImageClick = (imageSrc) => {
//     setZoomedImageSrc(imageSrc);
//     setShowZoomedImage(true);
//   };

//   // Function to close the zoomed image modal
//   const closeZoomModal = () => {
//     setShowZoomedImage(false);
//     setZoomedImageSrc("");
//   };

//   // Add product to cart logic

//   async function addToCart(id, name, image, MRP, rate, category, availableJar) {
//     console.log(
//       "Adding to cart:",
//       id,
//       name,
//       image,
//       MRP,
//       rate,
//       category,
//       availableJar
//     ); // Debugging log
//     try {
//       const qtyInput = document.getElementById(`qty-${id}`);
//       const quantity = parseInt(qtyInput.value);

//       if (isNaN(quantity) || quantity <= 0) {
//         alert("Please enter a valid quantity");
//         return;
//       }
//       if (quantity > availableJar) {
//         alert("Quantity exceeds available stock");
//         return;
//       }

//       // Update cart in localStorage
//       let cart = JSON.parse(localStorage.getItem("cart")) || [];
//       const existingProductIndex = cart.findIndex((item) => item.id === id);

//       if (existingProductIndex !== -1) {
//         cart[existingProductIndex].quantity += quantity;
//       } else {
//         cart.push({ id, name, image, MRP, rate, category, quantity });
//       }
//       localStorage.setItem("cart", JSON.stringify(cart));

//       // Optimistically update product availability in the UI
//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product._id === id
//             ? { ...product, available_jar: product.available_jar - quantity }
//             : product
//         )
//       );

//       // ✅ Use dynamic category path in API request
//       const response = await fetch(
//         `https://b-to-b-apixvuzum.onrender.com/${category}/api/order/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ qty: quantity }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update product quantity on server");
//       }

//       // alert(`${name} added to cart successfully!`);
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       alert("Error adding product to cart. Please try again.");
//     }
//   }

//   return (
//     <>
//      <ButtonNav></ButtonNav>
//     <div className="main">

//       {/* Zoom Modal */}
//       {showZoomedImage && (
//         <div className="zoom-modal" onClick={closeZoomModal}>
//           <button className="close-zoom-button" onClick={closeZoomModal}>
//             &times;
//           </button>
//           <img src={zoomedImageSrc} alt="Zoomed" className="zoomed-image" />
//         </div>
//       )}

//       <Navbar />
//       {/* <StickySearchBar /> */}

//       {!shop ? (
//         <p style={{ textAlign: "center", marginTop: "4rem" }}>
//           Loading shop details...
//         </p>
//       ) : (
//         <>
//         <PullToRefresh>
//           <h3 className="welcome-text">
//             Welcome, Team name : {salesmanName || "Guest"}
//           </h3>

//           <div className="shop-card1">
//             <img
//               src={shop.imageUrl}
//               alt={shop.shopName}
//               className="shop-image1"
//             />
//             <div className="shop-details1">
//               <h3 className="shop-name1">{shop.shopName}</h3>
//               <p>
//                 <strong>Owner:</strong> {shop.shopOwnerName}
//               </p>
//               <p>
//                 <strong>Contact:</strong> {shop.contact}
//               </p>
//               <p>
//                 <strong>Address:</strong> {shop.address}
//               </p>
//               <p>
//                 <strong>Location:</strong>{" "}
//                 <a
//                   href={shop.location}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="shop-location-link"
//                 >
//                   View
//                 </a>
//               </p>
//             </div>
//           </div>

//           {/* <div className="category-container">
//             <button onClick={() => loadCategory("biscuit")}>Biscuit</button>
//             <button onClick={() => loadCategory("chocolate")}>Chocolate</button>
//             <button onClick={() => loadCategory("drink")}>Drinks</button>
//             <button onClick={() => loadCategory("detergentbar")}>DetergentBar</button>
//           </div>

//           <div className="category-container">
//             <button onClick={() => loadCategory("kirana")}>Kirana</button>
//             <button onClick={() => loadCategory("oil")}>Oil</button>
//             <button onClick={() => loadCategory("shampoo")}>Shampoo</button>
//             <button onClick={() => loadCategory("other")}>Others</button>
//           </div> */}
//           <div className="category-grid">

//           <button
//               className="category-button"
//               onClick={() => loadCategory("babycare")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/babycare%20-%20Copy.png?updatedAt=1747907167863"
//                 alt="BabyCare"
//               />
//               <span>BabyCare</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("biscuit")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/buscuit1%20-%20Copy.png?updatedAt=1747740287264"
//                 alt="Biscuit"
//               />
//               <span>Biscuit</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("bathingsoap")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/bathingsoap1.png?updatedAt=1747897456879"
//                 alt="Bathing soap img"
//               />
//               <span>Bathing Soap</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("chocolate")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(28).png?updatedAt=1747740886211"
//                 alt="Chocolate"
//               />
//               <span>Chocolate</span>
//             </button>

//             {/* <button
//               className="category-button"
//               onClick={() => loadCategory("drink")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/colddrink.png?updatedAt=1747742323502"
//                 alt="Drinks"
//               />
//               <span>Drinks</span>
//             </button> */}

//             <button
//               className="category-button"
//               onClick={() => loadCategory("colddrink")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/colddrink.png?updatedAt=1747742323502"
//                 alt="Drinks"
//               />
//               <span> Cold Drinks</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("detergentbar")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(62).png?updatedAt=1747745565824"
//                 alt="DetergentBar"
//               />
//               <span>DetergentBar</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("detergentpowder")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/detergentbar1.png?updatedAt=1747847727622"
//                 alt="DetergentPowder"
//               />
//               <span>Detergent Powder</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("kirana")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/kirana.png?updatedAt=1747744923722"
//                 alt="Kirana"
//               />
//               <span>Kirana</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("napkin")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/napkins.png?updatedAt=1747901777431"
//                 alt="Kirana"
//               />
//               <span>Napkin & Pads</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("noodles")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/Noodles1%20-%20Copy.png?updatedAt=1747848853884"
//                 alt="Noodles"
//               />
//               <span>Noodles</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("personalcare")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/personalcare%20-%20Copy.png?updatedAt=1747907611637"
//                 alt="Personal Care"
//               />
//               <span>Personal Care</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("oil")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/oil_hair.png?updatedAt=1747744210410"
//                 alt="Oil"
//               />
//               <span>Hair Oil</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("shampoo")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(64).png?updatedAt=1747747526981"
//                 alt="Shampoo"
//               />
//               <span>Shampoo</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("tea")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/tea1.png?updatedAt=1747901413976"
//                 alt="Tea"
//               />
//               <span>Tea & Coffe</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("toothpaste")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/tothpaste1%20-%20Copy.png?updatedAt=1747897453528"
//                 alt="ToothPaste"
//               />
//               <span>ToothPaste</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("snack")}
//             >
//               <img
//                 src="https://ik.imagekit.io/secqprmji/snaks%20-%20Copy.png?updatedAt=1747884468953"
//                 alt="Snack"
//               />
//               <span>Snack</span>
//             </button>

//             <button
//               className="category-button"
//               onClick={() => loadCategory("other")}
//             >
//               <img src="/images/other.png" alt="Others" />
//               <span>Others</span>
//             </button>
//           </div>

//           {category && (
//             <h3 className="category-title">
//               {category.charAt(0).toUpperCase() + category.slice(1)} Products
//             </h3>
//           )}

//           {loading && <p>Loading products...</p>}

//           <div id="products" className="products-container">
//             {products.map((item) => (
//               <div key={item._id} className="product-card">
//                 <div className="product-image-container">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="product-image"
//                     onClick={() => handleImageClick(item.image)} // Trigger zoom on image click
//                   />
//                 </div>
//                 <div className="product-details">
//                   <h3>{item.name}</h3>
//                   <span className="product-mrp">MRP ₹{item.MRP}</span>
//                   <br />
//                   <span className="product-rate">
//                     <strong>Rate:</strong> ₹{item.rate}
//                   </span>
//                   <br />
//                   <p className="product-weight">
//                     Total Weight: {item.total_weight}
//                   </p>
//                   {item.available_jar > 0 ? (
//                     <p className="product-availability">
//                       <strong>Available:</strong>{" "}
//                       <span className="available-stock">
//                         {item.available_jar}
//                       </span>
//                     </p>
//                   ) : (
//                     <p className="product-availability out-of-stock">
//                       Out of Stock
//                     </p>
//                   )}
//                   <div className="product-actions">
//                     <input
//                       type="number"
//                       min="1"
//                       max={item.available_jar}
//                       defaultValue={1}
//                       disabled={item.available_jar === 0}
//                       id={`qty-${item._id}`}
//                       className="quantity-input"
//                     />
//                     <button
//                       id={`add-to-cart-${item._id}`}
//                       onClick={() =>
//                         addToCart(
//                           item._id,
//                           item.name,
//                           item.image,
//                           item.MRP,
//                           item.rate,
//                           category,
//                           item.available_jar
//                         )
//                       }
//                       disabled={item.available_jar === 0}
//                       className={`add-to-cart-button ${
//                         item.available_jar === 0 ? "out-of-stock" : ""
//                       }`}
//                     >
//                       {item.available_jar === 0
//                         ? "Out of Stock"
//                         : "Add to Cart"}
//                     </button>
//                   </div>
//                 </div>

//               </div>
//             ))}

//           </div>

//           </PullToRefresh>
//         </>
//       )}
//       </div>
//     </>
//   );
// };

// export default ChooseProductAndAddToCart;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./ChooseProductAndAddToCart.css";
// import Navbar from "../components/Navbar";
// // import StickySearchBar from "../components/StickySearchBar";
// import PullToRefresh from "../components/PullToRefresh";

// import ButtonNav from "../components/BottomNav";
// const ChooseProductAndAddToCart = () => {
//   const { region, shopId } = useParams();
//   const [shop, setShop] = useState(null);
//   const [salesmanName, setSalesmanName] = useState("");
//   const [category, setCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // State to control zoomed image modal
//   const [showZoomedImage, setShowZoomedImage] = useState(false);
//   const [zoomedImageSrc, setZoomedImageSrc] = useState("");

//   // Fetching shop details
//   useEffect(() => {
//     const fetchShopDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://fzt-api-frilu457.onrender.com/api/shops/${region}/${shopId}`
//         );
//         const data = await response.json();
//         setShop(data.shop);
//       } catch (error) {
//         console.error("Error fetching shop details:", error);
//       }
//     };

//     fetchShopDetails();

//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setSalesmanName(parsedUser.salesman_name);
//       } catch (e) {
//         console.error("Failed to parse user JSON:", e);
//       }
//     }
//   }, [region, shopId]);

//   // Load products by category
//   // Load products by category
//   const loadCategory = async (cat) => {
//     setCategory(cat);
//     setLoading(true);
//     setProducts([]); // Reset products when loading a new category
//     try {
//       const apiUrl = `https://b-to-b-apixvuzum.onrender.com/${cat}/api`; // Corrected endpoint URL
//       console.log("Fetching from:", apiUrl); // Debugging line to check the URL

//       const res = await fetch(apiUrl);

//       if (!res.ok) {
//         throw new Error("Failed to fetch products. Status: " + res.status);
//       }

//       const items = await res.json();
//       console.log("Fetched products:", items); // Debugging line to see the response

//       if (Array.isArray(items) && items.length > 0) {
//         setProducts(items);
//       } else {
//         alert("No products found for this category.");
//       }
//     } catch (error) {
//       console.error("Error loading products:", error.message);
//       alert("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle the image click to show the zoomed version
//   const handleImageClick = (imageSrc) => {
//     setZoomedImageSrc(imageSrc);
//     setShowZoomedImage(true);
//   };

//   // Function to close the zoomed image modal
//   const closeZoomModal = () => {
//     setShowZoomedImage(false);
//     setZoomedImageSrc("");
//   };
//   const handleCategoryClick = (cat) => {
//     loadCategory(cat);
//     setTimeout(() => {
//       window.scrollBy({ top: 3000, behavior: "smooth" });
//     }, 1000);
//   };
//   // Add product to cart logic

//   async function addToCart(id, name, image, MRP, rate, category, availableJar) {
//     console.log(
//       "Adding to cart:",
//       id,
//       name,
//       image,
//       MRP,
//       rate,
//       category,
//       availableJar
//     ); // Debugging log
//     try {
//       const qtyInput = document.getElementById(`qty-${id}`);
//       const quantity = parseInt(qtyInput.value);

//       if (isNaN(quantity) || quantity <= 0) {
//         alert("Please enter a valid quantity");
//         return;
//       }
//       if (quantity > availableJar) {
//         alert("Quantity exceeds available stock");
//         return;
//       }

//       // Update cart in localStorage
//       let cart = JSON.parse(localStorage.getItem("cart")) || [];
//       const existingProductIndex = cart.findIndex((item) => item.id === id);

//       if (existingProductIndex !== -1) {
//         cart[existingProductIndex].quantity += quantity;
//       } else {
//         cart.push({ id, name, image, MRP, rate, category, quantity });
//       }
//       localStorage.setItem("cart", JSON.stringify(cart));

//       // Optimistically update product availability in the UI
//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product._id === id
//             ? { ...product, available_jar: product.available_jar - quantity }
//             : product
//         )
//       );

//       // ✅ Use dynamic category path in API request
//       const response = await fetch(
//         `https://b-to-b-apixvuzum.onrender.com/${category}/api/order/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ qty: quantity }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update product quantity on server");
//       }

//       // alert(`${name} added to cart successfully!`);
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       alert("Error adding product to cart. Please try again.");
//     }
//   }

//   return (
//     <>
//      {/* <ButtonNav></ButtonNav> */}
//     <div className="main">

//       {/* Zoom Modal */}
//       {showZoomedImage && (
//         <div className="zoom-modal" onClick={closeZoomModal}>
//           <button className="close-zoom-button" onClick={closeZoomModal}>
//             &times;
//           </button>
//           <img src={zoomedImageSrc} alt="Zoomed" className="zoomed-image" />
//         </div>
//       )}

//       <Navbar />
//       {/* <StickySearchBar /> */}

//       {!shop ? (
//         <p style={{ textAlign: "center", marginTop: "4rem" }}>
//           Loading shop details...
//         </p>
//       ) : (
//         <>
//         <PullToRefresh>
//           <h3 className="welcome-text">
//             Welcome, Team name : {salesmanName || "Guest"}
//           </h3>

//           <div className="shop-card1">
//             <img
//               src={shop.imageUrl}
//               alt={shop.shopName}
//               className="shop-image1"
//             />
//             <div className="shop-details1">
//               <h3 className="shop-name1">{shop.shopName}</h3>
//               <p>
//                 <strong>Owner:</strong> {shop.shopOwnerName}
//               </p>
//               <p>
//                 <strong>Contact:</strong> {shop.contact}
//               </p>
//               <p>
//                 <strong>Address:</strong> {shop.address}
//               </p>
//               <p>
//                 <strong>Location:</strong>{" "}
//                 <a
//                   href={shop.location}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="shop-location-link"
//                 >
//                   View
//                 </a>
//               </p>
//             </div>
//           </div>

//           {/* <div className="category-container">
//             <button onClick={() => loadCategory("biscuit")}>Biscuit</button>
//             <button onClick={() => loadCategory("chocolate")}>Chocolate</button>
//             <button onClick={() => loadCategory("drink")}>Drinks</button>
//             <button onClick={() => loadCategory("detergentbar")}>DetergentBar</button>
//           </div>

//           <div className="category-container">
//             <button onClick={() => loadCategory("kirana")}>Kirana</button>
//             <button onClick={() => loadCategory("oil")}>Oil</button>
//             <button onClick={() => loadCategory("shampoo")}>Shampoo</button>
//             <button onClick={() => loadCategory("other")}>Others</button>
//           </div> */}
//           <div className="category-grid">
//   <button
//     className={`category-button ${category === "babycare" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("babycare")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/babycare%20-%20Copy.png?updatedAt=1747907167863" alt="BabyCare" />
//     <span>BabyCare</span>
//   </button>

//   <button
//     className={`category-button ${category === "biscuit" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("biscuit")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/buscuit1%20-%20Copy.png?updatedAt=1747740287264" alt="Biscuit" />
//     <span>Biscuit</span>
//   </button>

//   <button
//     className={`category-button ${category === "bathingsoap" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("bathingsoap")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/bathingsoap1.png?updatedAt=1747897456879" alt="Bathing soap img" />
//     <span>Bathing Soap</span>
//   </button>

//   <button
//     className={`category-button ${category === "chocolate" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("chocolate")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(28).png?updatedAt=1747740886211" alt="Chocolate" />
//     <span>Chocolate</span>
//   </button>

//   <button
//     className={`category-button ${category === "colddrink" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("colddrink")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/colddrink.png?updatedAt=1747742323502" alt="Drinks" />
//     <span>Cold Drinks</span>
//   </button>

//   <button
//     className={`category-button ${category === "detergentbar" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("detergentbar")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(62).png?updatedAt=1747745565824" alt="DetergentBar" />
//     <span>DetergentBar</span>
//   </button>

//   <button
//     className={`category-button ${category === "detergentpowder" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("detergentpowder")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/detergentbar1.png?updatedAt=1747847727622" alt="DetergentPowder" />
//     <span>Detergent Powder</span>
//   </button>

//   <button
//     className={`category-button ${category === "kirana" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("kirana")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/kirana.png?updatedAt=1747744923722" alt="Kirana" />
//     <span>Kirana</span>
//   </button>

//   <button
//     className={`category-button ${category === "napkin" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("napkin")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/napkins.png?updatedAt=1747901777431" alt="Napkin" />
//     <span>Napkin & Pads</span>
//   </button>

//   <button
//     className={`category-button ${category === "noodles" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("noodles")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/Noodles1%20-%20Copy.png?updatedAt=1747848853884" alt="Noodles" />
//     <span>Noodles</span>
//   </button>

//   <button
//     className={`category-button ${category === "personalcare" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("personalcare")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/personalcare%20-%20Copy.png?updatedAt=1747907611637" alt="Personal Care" />
//     <span>Personal Care</span>
//   </button>

//   <button
//     className={`category-button ${category === "oil" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("oil")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/oil_hair.png?updatedAt=1747744210410" alt="Oil" />
//     <span>Hair Oil</span>
//   </button>

//   <button
//     className={`category-button ${category === "shampoo" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("shampoo")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(64).png?updatedAt=1747747526981" alt="Shampoo" />
//     <span>Shampoo</span>
//   </button>

//   <button
//     className={`category-button ${category === "tea" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("tea")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/tea1.png?updatedAt=1747901413976" alt="Tea" />
//     <span>Tea & Coffee</span>
//   </button>

//   <button
//     className={`category-button ${category === "toothpaste" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("toothpaste")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/tothpaste1%20-%20Copy.png?updatedAt=1747897453528" alt="ToothPaste" />
//     <span>ToothPaste</span>
//   </button>

//   <button
//     className={`category-button ${category === "snack" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("snack")}
//   >
//     <img src="https://ik.imagekit.io/secqprmji/snaks%20-%20Copy.png?updatedAt=1747884468953" alt="Snack" />
//     <span>Snack</span>
//   </button>

//   <button
//     className={`category-button ${category === "other" ? "active" : ""}`}
//     onClick={() => handleCategoryClick("other")}
//   >
//     <img src="/images/other.png" alt="Others" />
//     <span>Others</span>
//   </button>
// </div>

//           {category && (
//             <h3 className="category-title">
//               {category.charAt(0).toUpperCase() + category.slice(1)} Products
//             </h3>
//           )}

//           {loading && <p>Loading products...</p>}

//           <div id="products" className="products-container">
//             {products.map((item) => (
//               <div key={item._id} className="product-card">
//                 <div className="product-image-container">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="product-image"
//                     onClick={() => handleImageClick(item.image)} // Trigger zoom on image click
//                   />
//                 </div>
//                 <div className="product-details">
//                   <h3>{item.name}</h3>
//                   <span className="product-mrp">MRP ₹{item.MRP}</span>
//                   <br />
//                   <span className="product-rate">
//                     <strong>Rate:</strong> ₹{item.rate}
//                   </span>
//                   <br />
//                   <p className="product-weight">
//                     Total Weight: {item.total_weight}
//                   </p>
//                   {item.available_jar > 0 ? (
//                     <p className="product-availability">
//                       <strong>Available:</strong>{" "}
//                       <span className="available-stock">
//                         {item.available_jar}
//                       </span>
//                     </p>
//                   ) : (
//                     <p className="product-availability out-of-stock">
//                       Out of Stock
//                     </p>
//                   )}
//                   <div className="product-actions">
//                     <input
//                       type="number"
//                       min="1"
//                       max={item.available_jar}
//                       defaultValue={1}
//                       disabled={item.available_jar === 0}
//                       id={`qty-${item._id}`}
//                       className="quantity-input"
//                     />
//                     <button
//                       id={`add-to-cart-${item._id}`}
//                       onClick={() =>
//                         addToCart(
//                           item._id,
//                           item.name,
//                           item.image,
//                           item.MRP,
//                           item.rate,
//                           category,
//                           item.available_jar
//                         )
//                       }
//                       disabled={item.available_jar === 0}
//                       className={`add-to-cart-button ${
//                         item.available_jar === 0 ? "out-of-stock" : ""
//                       }`}
//                     >
//                       {item.available_jar === 0
//                         ? "Out of Stock"
//                         : "Add to Cart"}
//                     </button>
//                   </div>
//                 </div>

//               </div>
//             ))}

//           </div>

//           </PullToRefresh>
//         </>
//       )}
//       </div>
//     </>
//   );
// };

// export default ChooseProductAndAddToCart;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./ChooseProductAndAddToCart.css";
// import Navbar from "../components/Navbar";
// import PullToRefresh from "../components/PullToRefresh";
// import ButtonNav from "../components/BottomNav"; // Assuming this is your BottomNav component

// const ChooseProductAndAddToCart = () => {
//   const { region, shopId } = useParams();
//   const [shop, setShop] = useState(null);
//   const [salesmanName, setSalesmanName] = useState("");
//   const [category, setCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState(""); // New state for search term
//   const [filteredProducts, setFilteredProducts] = useState([]); // New state for filtered products

//   // State to control zoomed image modal
//   const [showZoomedImage, setShowZoomedImage] = useState(false);
//   const [zoomedImageSrc, setZoomedImageSrc] = useState("");

//   // Fetching shop details
//   useEffect(() => {
//     const fetchShopDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://fzt-api-frilu457.onrender.com/api/shops/${region}/${shopId}`
//         );
//         const data = await response.json();
//         setShop(data.shop);
//       } catch (error) {
//         console.error("Error fetching shop details:", error);
//       }
//     };

//     fetchShopDetails();

//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setSalesmanName(parsedUser.salesman_name);
//       } catch (e) {
//         console.error("Failed to parse user JSON:", e);
//       }
//     }
//   }, [region, shopId]);

//   // Load products by category
//   const loadCategory = async (cat) => {
//     setCategory(cat);
//     setLoading(true);
//     setProducts([]); // Reset products when loading a new category
//     setFilteredProducts([]); // Reset filtered products
//     setSearchTerm(""); // Clear search term when a new category is loaded

//     try {
//       const apiUrl = `https://b-to-b-apixvuzum.onrender.com/${cat}/api`; // Corrected endpoint URL
//       console.log("Fetching from:", apiUrl); // Debugging line to check the URL

//       // const res = await fetch(apiUrl);
//       const token = localStorage.getItem("salesman_token");

//       const res = await fetch(apiUrl, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`, // ⬅️ Attach JWT token here
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) {
//         throw new Error("Failed to fetch products. Status: " + res.status);
//       }

//       const items = await res.json();
//       console.log("Fetched products:", items); // Debugging line to see the response

//       if (Array.isArray(items) && items.length > 0) {
//         setProducts(items);
//         setFilteredProducts(items); // Initialize filtered products with all products
//       } else {
//         alert("No products found for this category.");
//       }
//     } catch (error) {
//       console.error("Error loading products:", error.message);
//       alert("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle the image click to show the zoomed version
//   const handleImageClick = (imageSrc) => {
//     setZoomedImageSrc(imageSrc);
//     setShowZoomedImage(true);
//   };

//   // Function to close the zoomed image modal
//   const closeZoomModal = () => {
//     setShowZoomedImage(false);
//     setZoomedImageSrc("");
//   };

//   // Handler for category button click
//   const handleCategoryClick = (cat) => {
//     loadCategory(cat);
//     // You might want to scroll to the product list or search bar after category load
//     setTimeout(() => {
//       // Option 1: Scroll to the category title or search bar
//       const categoryTitleElement = document.querySelector(".category-title");
//       if (categoryTitleElement) {
//         categoryTitleElement.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }
//       // Option 2: Scroll by a fixed amount (less reliable across different screen sizes)
//       // window.scrollBy({ top: 300, behavior: "smooth" });
//     }, 300); // Small delay to allow content to render
//   };

//   // Add product to cart logic
//   async function addToCart(
//     id,
//     name,
//     image,
//     MRP,
//     rate,
//     category,
//     availableJar,
//     brand_name
//   ) {
//     console.log(
//       "Adding to cart:",
//       id,
//       name,
//       image,
//       MRP,
//       rate,
//       category,
//       availableJar,
//       brand_name
//     ); // Debugging log
//     try {
//       const qtyInput = document.getElementById(`qty-${id}`);
//       const quantity = parseInt(qtyInput.value);

//       if (isNaN(quantity) || quantity <= 0) {
//         alert("Please enter a valid quantity");
//         return;
//       }
//       if (quantity > availableJar) {
//         alert("Quantity exceeds available stock");
//         return;
//       }

//       // Update cart in localStorage
//       let cart = JSON.parse(localStorage.getItem("cart")) || [];
//       const existingProductIndex = cart.findIndex((item) => item.id === id);

//       if (existingProductIndex !== -1) {
//         cart[existingProductIndex].quantity += quantity;
//       } else {
//         cart.push({
//           id,
//           name,
//           image,
//           MRP,
//           rate,
//           category,
//           quantity,
//           brand_name,
//         });
//       }
//       localStorage.setItem("cart", JSON.stringify(cart));

//       // Optimistically update product availability in the UI
//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product._id === id
//             ? { ...product, available_jar: product.available_jar - quantity }
//             : product
//         )
//       );
//       // Also update filteredProducts
//       setFilteredProducts((prevFilteredProducts) =>
//         prevFilteredProducts.map((product) =>
//           product._id === id
//             ? { ...product, available_jar: product.available_jar - quantity }
//             : product
//         )
//       );

//       // Use dynamic category path in API request
//       const response = await fetch(
//         `https://b-to-b-apixvuzum.onrender.com/${category}/api/order/${id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ qty: quantity }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update product quantity on server");
//       }

//       // alert(`${name} added to cart successfully!`); // You can uncomment this if you want an alert
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       alert("Error adding product to cart. Please try again.");
//     }
//   }

//   // Handle search input change
//   useEffect(() => {
//     if (searchTerm === "") {
//       setFilteredProducts(products); // If search term is empty, show all products
//     } else {
//       const lowercasedSearchTerm = searchTerm.toLowerCase();
//       const filtered = products.filter((product) => {
//         const name = product.name?.toLowerCase() || "";
//         const mrp = product.MRP?.toString() || "";
//         const rate = product.rate?.toString() || "";
//         const weight = product.total_weight?.toLowerCase() || "";

//         return (
//           name.includes(lowercasedSearchTerm) ||
//           mrp.includes(lowercasedSearchTerm) ||
//           rate.includes(lowercasedSearchTerm) ||
//           weight.includes(lowercasedSearchTerm)
//         );
//       });

//       setFilteredProducts(filtered);
//     }
//   }, [searchTerm, products]); // Re-filter when search term or products change

//   return (
//     <>
//       <div className="pageWrapper">
//         <div className="main">
//           {/* Zoom Modal */}
//           {showZoomedImage && (
//             <div className="zoom-modal" onClick={closeZoomModal}>
//               <button className="close-zoom-button" onClick={closeZoomModal}>
//                 &times;
//               </button>
//               <img src={zoomedImageSrc} alt="Zoomed" className="zoomed-image" />
//             </div>
//           )}

//           <Navbar />

//           {!shop ? (
//             <p style={{ textAlign: "center", marginTop: "4rem" }}>
//               Loading shop details...
//             </p>
//           ) : (
//             <>
//               <h3 className="welcome-text">
//                 Order for {shop.shopOwnerName} by {salesmanName || "Guest"}
//               </h3>

//               <div className="shop-card1">
//                 {/* <img
//                   src={shop.imageUrl}
//                   alt={shop.shopName}
//                   className="shop-image1"
//                 /> */}
//                 <img
//                   src={shop.imageUrl}
//                   alt={shop.shopName}
//                   className="shop-image1"
//                   onClick={() => {
//                     setZoomedImageSrc(shop.imageUrl);
//                     setShowZoomedImage(true);
//                   }}
//                   style={{ cursor: "zoom-in" }}
//                 />

//                 <div className="shop-details1">
//                   <h3 className="shop-name1">{shop.shopName}</h3>
//                   <p>
//                     <strong>Owner:</strong> {shop.shopOwnerName}
//                   </p>
//                   <p>
//                     <strong>Contact:</strong> {shop.contact}
//                   </p>
//                   <p>
//                     <strong>Address:</strong> {shop.address}
//                   </p>
//                   <p>
//                     <strong>Location:</strong>{" "}
//                     <a
//                       href={shop.location}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="shop-location-link"
//                     >
//                       View
//                     </a>
//                   </p>
//                 </div>
//               </div>

//               <div className="category-grid">
//                 <button
//                   className={`category-button ${
//                     category === "babycare" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("babycare")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/babycare%20-%20Copy.png?updatedAt=1747907167863"
//                     alt="BabyCare"
//                   />
//                   <span>BabyCare</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "biscuit" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("biscuit")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/buscuit1%20-%20Copy.png?updatedAt=1747740287264"
//                     alt="Biscuit"
//                   />
//                   <span>Biscuit</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "bathingsoap" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("bathingsoap")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/bathingsoap1.png?updatedAt=1747897456879"
//                     alt="Bathing soap img"
//                   />
//                   <span>Bathing Soap</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "chocolate" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("chocolate")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(28).png?updatedAt=1747740886211"
//                     alt="Chocolate"
//                   />
//                   <span>Chocolate</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "colddrink" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("colddrink")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/colddrink.png?updatedAt=1747742323502"
//                     alt="Drinks"
//                   />
//                   <span>Cold Drinks</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "detergentbar" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("detergentbar")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(62).png?updatedAt=1747745565824"
//                     alt="DetergentBar"
//                   />
//                   <span>DetergentBar</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "detergentpowder" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("detergentpowder")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/detergentbar1.png?updatedAt=1747847727622"
//                     alt="DetergentPowder"
//                   />
//                   <span>Detergent Powder</span>
//                 </button>




//                 <button
//                   className={`category-button ${
//                     category === "electric" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("electric")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/kirana.png?updatedAt=1747744923722"
//                     alt="Kirana"
//                   />
//                   <span>Electric</span>
//                 </button>





//                 <button
//                   className={`category-button ${
//                     category === "kirana" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("kirana")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/kirana.png?updatedAt=1747744923722"
//                     alt="Kirana"
//                   />
//                   <span>Kirana</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "napkin" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("napkin")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/napkins.png?updatedAt=1747901777431"
//                     alt="Napkin"
//                   />
//                   <span>Napkin & Pads</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "noodles" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("noodles")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/Noodles1%20-%20Copy.png?updatedAt=1747848853884"
//                     alt="Noodles"
//                   />
//                   <span>Noodles</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "personalcare" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("personalcare")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/personalcare%20-%20Copy.png?updatedAt=1747907611637"
//                     alt="Personal Care"
//                   />
//                   <span>Personal Care</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "oil" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("oil")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/oil_hair.png?updatedAt=1747744210410"
//                     alt="Oil"
//                   />
//                   <span>Hair Oil</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "shampoo" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("shampoo")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(64).png?updatedAt=1747747526981"
//                     alt="Shampoo"
//                   />
//                   <span>Shampoo</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "tea" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("tea")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/tea1.png?updatedAt=1747901413976"
//                     alt="Tea"
//                   />
//                   <span>Tea & Coffee</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "toothpaste" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("toothpaste")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/tothpaste1%20-%20Copy.png?updatedAt=1747897453528"
//                     alt="ToothPaste"
//                   />
//                   <span>ToothPaste</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "snack" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("snack")}
//                 >
//                   <img
//                     src="https://ik.imagekit.io/secqprmji/snaks%20-%20Copy.png?updatedAt=1747884468953"
//                     alt="Snack"
//                   />
//                   <span>Snack</span>
//                 </button>

//                 <button
//                   className={`category-button ${
//                     category === "other" ? "active" : ""
//                   }`}
//                   onClick={() => handleCategoryClick("other")}
//                 >
//                   <img src="/images/other.png" alt="Others" />
//                   <span>Others</span>
//                 </button>
//               </div>

//               {category && (
//                 <div className="sticky-header-container">
//                   {" "}
//                   {/* NEW WRAPPER DIV */}
//                   <h3 className="category-title">
//                     {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
//                     Products
//                   </h3>
//                   <div className="search-bar-container">
//                     <input
//                       type="text"
//                       placeholder="Search products by name, MRP, rate..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="product-search-input"
//                     />
//                   </div>
//                 </div> /* END NEW WRAPPER DIV */
//               )}

//               {loading && <p>Loading products...</p>}

//               <div id="products" className="products-container">
//                 {filteredProducts.length > 0
//                   ? filteredProducts.map((item) => (
//                       <div key={item._id} className="product-card">
//                         <div className="product-image-container">
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="product-image"
//                             onClick={() => handleImageClick(item.image)} // Trigger zoom on image click
//                           />
//                         </div>
//                         <div className="product-details">
//                           <h3>{item.name}</h3>
//                           {/* <h4>{item.bran}</h4> */}
//                           {/* <p>{item.brand_name}</p> */}
//                           <p
//                             style={{
//                               alignItems: "center",
//                               textAlign: "start",
//                               fontWeight: "bold",
//                               // color: "",
//                               backgroundColor:
//                                 item.brand_name &&
//                                 item.brand_name.toLowerCase() === "hul"
//                                   ? "red"
//                                   : "transparent",
//                             }}
//                           >
//                             Brand :{" "}
//                             <span
//                               style={{
//                                 textDecoration: "underline",
//                                 color: "orange",
//                               }}
//                             >
//                               {item.brand_name}
//                             </span>
//                           </p>

//                           <span className="product-mrp">MRP ₹{item.MRP}</span>
//                           <br />
//                           <span className="product-rate">
//                             <strong>Rate:</strong> ₹{item.rate}
//                           </span>
//                           <br />
//                           <p className="product-weight">
//                             Total Weight: {item.total_weight}
//                           </p>
//                           {item.available_jar > 0 ? (
//                             <p className="product-availability">
//                               <strong>Available:</strong>{" "}
//                               <span className="available-stock">
//                                 {item.available_jar}
//                               </span>
//                             </p>
//                           ) : (
//                             <p className="product-availability out-of-stock">
//                               Out of Stock
//                             </p>
//                           )}
//                           <div className="product-actions">
//                             <input
//                               type="number"
//                               min="1"
//                               max={item.available_jar}
//                               defaultValue={1}
//                               disabled={item.available_jar === 0}
//                               id={`qty-${item._id}`}
//                               className="quantity-input"
//                             />
//                             <button
//                               id={`add-to-cart-${item._id}`}
//                               onClick={() =>
//                                 addToCart(
//                                   item._id,
//                                   item.name,
//                                   item.image,
//                                   item.MRP,
//                                   item.rate,
//                                   category,
//                                   item.available_jar,
//                                   item.brand_name // Assuming brandName is part of the item object
//                                 )
//                               }
//                               disabled={item.available_jar === 0}
//                               className={`add-to-cart-button ${
//                                 item.available_jar === 0 ? "out-of-stock" : ""
//                               }`}
//                             >
//                               {item.available_jar === 0
//                                 ? "Out of Stock"
//                                 : "Add to Cart"}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   : !loading &&
//                     category && <p>No products found matching your search.</p>}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChooseProductAndAddToCart;























































































//when add to cart than take some time proceesing beacue if user rapidly 
//do add to cart may be some product not reduce from db.




import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ChooseProductAndAddToCart.css";
import Navbar from "../components/Navbar";
import PullToRefresh from "../components/PullToRefresh";
import ButtonNav from "../components/BottomNav"; // Assuming this is your BottomNav component

const ChooseProductAndAddToCart = () => {
  const { region, shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [salesmanName, setSalesmanName] = useState("");
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [filteredProducts, setFilteredProducts] = useState([]); // New state for filtered products

  // State to control zoomed image modal
  const [showZoomedImage, setShowZoomedImage] = useState(false);
  const [zoomedImageSrc, setZoomedImageSrc] = useState("");

  // Fetching shop details
  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await fetch(
          `https://fzt-api-frilu457-3use.onrender.com/api/shops/${region}/${shopId}`
        );
        const data = await response.json();
        setShop(data.shop);
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    };

    fetchShopDetails();

    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setSalesmanName(parsedUser.salesman_name);
      } catch (e) {
        console.error("Failed to parse user JSON:", e);
      }
    }
  }, [region, shopId]);

  // Load products by category
  const loadCategory = async (cat) => {
    setCategory(cat);
    setLoading(true);
    setProducts([]); // Reset products when loading a new category
    setFilteredProducts([]); // Reset filtered products
    setSearchTerm(""); // Clear search term when a new category is loaded

    try {
      const apiUrl = `https://admin.flipzonto.com/${cat}/api`; // Corrected endpoint URL
      console.log("Fetching from:", apiUrl); // Debugging line to check the URL

      // const res = await fetch(apiUrl);
      const token = localStorage.getItem("salesman_token");

      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // ⬅️ Attach JWT token here
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch products. Status: " + res.status);
      }

      const items = await res.json();
      console.log("Fetched products:", items); // Debugging line to see the response

      if (Array.isArray(items) && items.length > 0) {
        setProducts(items);
        setFilteredProducts(items); // Initialize filtered products with all products
      } else {
        alert("No products found for this category.");
      }
    } catch (error) {
      console.error("Error loading products:", error.message);
      alert("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the image click to show the zoomed version
  const handleImageClick = (imageSrc) => {
    setZoomedImageSrc(imageSrc);
    setShowZoomedImage(true);
  };

  // Function to close the zoomed image modal
  const closeZoomModal = () => {
    setShowZoomedImage(false);
    setZoomedImageSrc("");
  };

  // Handler for category button click
  const handleCategoryClick = (cat) => {
    loadCategory(cat);
    // You might want to scroll to the product list or search bar after category load
    setTimeout(() => {
      // Option 1: Scroll to the category title or search bar
      const categoryTitleElement = document.querySelector(".category-title");
      if (categoryTitleElement) {
        categoryTitleElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      // Option 2: Scroll by a fixed amount (less reliable across different screen sizes)
      // window.scrollBy({ top: 300, behavior: "smooth" });
    }, 300); // Small delay to allow content to render
  };

  // Add product to cart logic
async function addToCart(
  id,
  name,
  image,
  MRP,
  rate,
  category,
  availableJar,
  brand_name
) {
  const button = document.getElementById(`add-to-cart-${id}`);
  const qtyInput = document.getElementById(`qty-${id}`);

  // Disable button immediately
  button.disabled = true;
  button.textContent = "Processing...";

  try {
    const quantity = parseInt(qtyInput.value);

    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    if (quantity > availableJar) {
      alert("Quantity exceeds available stock");
      return;
    }

    // Update cart in localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((item) => item.id === id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({
        id,
        name,
        image,
        MRP,
        rate,
        category,
        quantity,
        brand_name,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Optimistically update UI
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, available_jar: p.available_jar - quantity } : p
      )
    );
    setFilteredProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, available_jar: p.available_jar - quantity } : p
      )
    );

    // Update on server
    const response = await fetch(
      `https://admin.flipzonto.com/${category}/api/order/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: quantity }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update product quantity on server");
    }

    // Success - keep button disabled if stock is zero
    const updatedAvailable = availableJar - quantity;
    if (updatedAvailable <= 0) {
      button.textContent = "Out of Stock";
    } else {
      button.disabled = false;
      button.textContent = "Add to Cart";
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    alert("Error adding product to cart. Please try again.");
    // Re-enable button on error
    button.disabled = false;
    button.textContent = "Add to Cart";
  }
}


  // Handle search input change
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products); // If search term is empty, show all products
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = products.filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const mrp = product.MRP?.toString() || "";
        const rate = product.rate?.toString() || "";
        const weight = product.total_weight?.toLowerCase() || "";

        return (
          name.includes(lowercasedSearchTerm) ||
          mrp.includes(lowercasedSearchTerm) ||
          rate.includes(lowercasedSearchTerm) ||
          weight.includes(lowercasedSearchTerm)
        );
      });

      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]); // Re-filter when search term or products change

  return (
    <>
      <div className="pageWrapper">
        <div className="main">
          {/* Zoom Modal */}
          {showZoomedImage && (
            <div className="zoom-modal" onClick={closeZoomModal}>
              <button className="close-zoom-button" onClick={closeZoomModal}>
                &times;
              </button>
              <img src={zoomedImageSrc} alt="Zoomed" className="zoomed-image" />
            </div>
          )}

          <Navbar />

          {!shop ? (
            <p style={{ textAlign: "center", marginTop: "4rem" }}>
              Loading shop details...
            </p>
          ) : (
            <>
              <h3 className="welcome-text">
                Order for {shop.shopOwnerName} by {salesmanName || "Guest"}
              </h3>

              <div className="shop-card1">
                {/* <img
                  src={shop.imageUrl}
                  alt={shop.shopName}
                  className="shop-image1"
                /> */}
                <img
                  src={shop.imageUrl}
                  alt={shop.shopName}
                  className="shop-image1"
                  onClick={() => {
                    setZoomedImageSrc(shop.imageUrl);
                    setShowZoomedImage(true);
                  }}
                  style={{ cursor: "zoom-in" }}
                />

                <div className="shop-details1">
                  <h3 className="shop-name1">{shop.shopName}</h3>
                  <p>
                    <strong>Owner:</strong> {shop.shopOwnerName}
                  </p>
                  <p>
                    <strong>Contact:</strong> {shop.contact}
                  </p>
                  <p>
                    <strong>Address:</strong> {shop.address}
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    <a
                      href={shop.location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shop-location-link"
                    >
                      View
                    </a>
                  </p>
                </div>
              </div>

              <div className="category-grid">
                <button
                  className={`category-button ${
                    category === "babycare" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("babycare")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/babycare%20-%20Copy.png?updatedAt=1747907167863"
                    alt="BabyCare"
                  />
                  <span>BabyCare</span>
                </button>

                <button
                  className={`category-button ${
                    category === "biscuit" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("biscuit")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/buscuit1%20-%20Copy.png?updatedAt=1747740287264"
                    alt="Biscuit"
                  />
                  <span>Biscuit</span>
                </button>

                <button
                  className={`category-button ${
                    category === "bathingsoap" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("bathingsoap")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/bathingsoap1.png?updatedAt=1747897456879"
                    alt="Bathing soap img"
                  />
                  <span>Bathing Soap</span>
                </button>

                <button
                  className={`category-button ${
                    category === "chocolate" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("chocolate")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(28).png?updatedAt=1747740886211"
                    alt="Chocolate"
                  />
                  <span>Chocolate</span>
                </button>

                <button
                  className={`category-button ${
                    category === "colddrink" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("colddrink")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/colddrink.png?updatedAt=1747742323502"
                    alt="Drinks"
                  />
                  <span>Cold Drinks</span>
                </button>

                <button
                  className={`category-button ${
                    category === "detergentbar" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("detergentbar")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(62).png?updatedAt=1747745565824"
                    alt="DetergentBar"
                  />
                  <span>DetergentBar</span>
                </button>

                <button
                  className={`category-button ${
                    category === "detergentpowder" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("detergentpowder")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/detergentbar1.png?updatedAt=1747847727622"
                    alt="DetergentPowder"
                  />
                  <span>Detergent Powder</span>
                </button>




                <button
                  className={`category-button ${
                    category === "electric" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("electric")}
                >
                  <img
                  
                  id="gif"
                    src="https://ik.imagekit.io/secqprmji/%E0%A4%95%E0%A4%BE%E0%A4%B2%E0%A5%87%20%E0%A4%94%E0%A4%B0%20%E0%A4%AA%E0%A5%80%E0%A4%B2%E0%A5%87%20%E0%A4%B0%E0%A4%82%E0%A4%97%20%E0%A4%95%E0%A5%80%20%E0%A4%9F%E0%A4%BE%E0%A4%87%E0%A4%AA%E0%A5%8B%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%AB%E0%A5%80%20%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A5%80%E0%A4%A4%20%E0%A4%B2%E0%A5%8B%E0%A4%97%E0%A5%8B%20(1).gif?updatedAt=1751781816953"
                    alt="electric"
                   
                  />
                  <span>Electric</span>
                </button>





                <button
                  className={`category-button ${
                    category === "kirana" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("kirana")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/kirana.png?updatedAt=1747744923722"
                    alt="Kirana"
                  />
                  <span>Kirana</span>
                </button>

                <button
                  className={`category-button ${
                    category === "napkin" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("napkin")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/napkins.png?updatedAt=1747901777431"
                    alt="Napkin"
                  />
                  <span>Napkin & Pads</span>
                </button>

                <button
                  className={`category-button ${
                    category === "noodles" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("noodles")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/Noodles1%20-%20Copy.png?updatedAt=1747848853884"
                    alt="Noodles"
                  />
                  <span>Noodles</span>
                </button>

                <button
                  className={`category-button ${
                    category === "personalcare" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("personalcare")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/personalcare%20-%20Copy.png?updatedAt=1747907611637"
                    alt="Personal Care"
                  />
                  <span>Personal Care</span>
                </button>

                <button
                  className={`category-button ${
                    category === "oil" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("oil")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/oil_hair.png?updatedAt=1747744210410"
                    alt="Oil"
                  />
                  <span>Hair Oil</span>
                </button>

                <button
                  className={`category-button ${
                    category === "shampoo" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("shampoo")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/Untitled%20design%20(64).png?updatedAt=1747747526981"
                    alt="Shampoo"
                  />
                  <span>Shampoo</span>
                </button>

                <button
                  className={`category-button ${
                    category === "tea" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("tea")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/tea1.png?updatedAt=1747901413976"
                    alt="Tea"
                  />
                  <span>Tea & Coffee</span>
                </button>

                <button
                  className={`category-button ${
                    category === "toothpaste" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("toothpaste")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/tothpaste1%20-%20Copy.png?updatedAt=1747897453528"
                    alt="ToothPaste"
                  />
                  <span>ToothPaste</span>
                </button>

                <button
                  className={`category-button ${
                    category === "snack" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("snack")}
                >
                  <img
                    src="https://ik.imagekit.io/secqprmji/snaks%20-%20Copy.png?updatedAt=1747884468953"
                    alt="Snack"
                  />
                  <span>Snack</span>
                </button>

                <button
                  className={`category-button ${
                    category === "other" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("other")}
                >
                  <img src="/images/other.png" alt="Others" />
                  <span>Others</span>
                </button>
              </div>

              {category && (
                <div className="sticky-header-container">
                  {" "}
                  {/* NEW WRAPPER DIV */}
                  <h3 className="category-title">
                    {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                    Products
                  </h3>
                  <div className="search-bar-container">
                    <input
                      type="text"
                      placeholder="Search products by name, MRP, rate..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="product-search-input"
                    />
                  </div>
                </div> /* END NEW WRAPPER DIV */
              )}

              {loading && <p>Loading products...</p>}

              <div id="products" className="products-container">
                {filteredProducts.length > 0
                  ? filteredProducts.map((item) => (
                      <div key={item._id} className="product-card">
                        <div className="product-image-container">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="product-image"
                            onClick={() => handleImageClick(item.image)} // Trigger zoom on image click
                          />
                        </div>
                        <div className="product-details">
                          <h3>{item.name}</h3>
                          {/* <h4>{item.bran}</h4> */}
                          {/* <p>{item.brand_name}</p> */}
                          <p
                            style={{
                              alignItems: "center",
                              textAlign: "start",
                              fontWeight: "bold",
                              // color: "",
                              backgroundColor:
                                item.brand_name &&
                                item.brand_name.toLowerCase() === "hul"
                                  ? "red"
                                  : "transparent",
                            }}
                          >
                            Brand :{" "}
                            <span
                              style={{
                                textDecoration: "underline",
                                color: "orange",
                              }}
                            >
                              {item.brand_name}
                            </span>
                          </p>

                          <span className="product-mrp">MRP ₹{item.MRP}</span>
                          <br />
                          <span className="product-rate">
                            <strong>Rate:</strong> ₹{item.rate}
                          </span>
                          <br />
                          <p className="product-weight">
                            Total Weight: {item.total_weight}
                          </p>
                          {item.available_jar > 0 ? (
                            <p className="product-availability">
                              <strong>Available:</strong>{" "}
                              <span className="available-stock">
                                {item.available_jar}
                              </span>
                            </p>
                          ) : (
                            <p className="product-availability out-of-stock">
                              Out of Stock
                            </p>
                          )}
                          <div className="product-actions">
                            <input
                              type="number"
                              min="1"
                              max={item.available_jar}
                              defaultValue={1}
                              disabled={item.available_jar === 0}
                              id={`qty-${item._id}`}
                              className="quantity-input"
                            />
                            <button
                              id={`add-to-cart-${item._id}`}
                              onClick={() =>
                                addToCart(
                                  item._id,
                                  item.name,
                                  item.image,
                                  item.MRP,
                                  item.rate,
                                  category,
                                  item.available_jar,
                                  item.brand_name // Assuming brandName is part of the item object
                                )
                              }
                              disabled={item.available_jar === 0}
                              className={`add-to-cart-button ${
                                item.available_jar === 0 ? "out-of-stock" : ""
                              }`}
                            >
                              {item.available_jar === 0
                                ? "Out of Stock"
                                : "Add to Cart"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  : !loading &&
                    category && <p>No products found matching your search.</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChooseProductAndAddToCart;

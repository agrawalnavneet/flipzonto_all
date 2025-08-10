
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Cart.module.css";
import successGif from "../assets/succesgif.gif"; // Adjust path if needed

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [salesmanName, setSalesmanName] = useState("");
  const [salesmanContact, setSalesmanContact] = useState("");
  const [shopDetails, setShopDetails] = useState(null);
  const [comment, setComment] = useState("");
  const [orderDate, setOrderDate] = useState(new Date().toISOString().slice(0, 16));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessGif, setShowSuccessGif] = useState(false); // ✅ New state

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);

    const user = JSON.parse(localStorage.getItem("user")) || {};
    setSalesmanName(user.salesman_name || "Unknown Salesman");
    setSalesmanContact(user.salesman_contact || "");

    const selectedShop = JSON.parse(localStorage.getItem("selectedShop"));
    setShopDetails(selectedShop);
  }, []);

  const handleRemoveFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // const handleOrderAll = () => {
  //   setIsModalOpen(true);
  // };
  const getLocalDateTime = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localDate = new Date(now.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
};

  const handleOrderAll = () => {
  const currentDateTime = getLocalDateTime(); // ✅ Local time
  setOrderDate(currentDateTime);
  setIsModalOpen(true);
};



  const handleOrderSubmit = async () => {
    if (!salesmanContact.trim()) return alert("Please enter your contact number.");
    if (!comment.trim()) return alert("Please enter a comment.");

    const orderDetails = {
      shopDetails,
      cartItems,
      salesmanName,
      salesmanContact,
      comment,
      orderDate,
    };

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://admin.flipzonto.com/api/orders",
        orderDetails,
        { withCredentials: true }
      );

      if (response.data.success) {
        setShowSuccessGif(true); // Show success GIF

        setTimeout(() => {
          setShowSuccessGif(false); // Hide after 3s
        }, 2000);

        // alert("Order placed successfully!");
        localStorage.removeItem("cart");
        setCartItems([]);
        setIsModalOpen(false);
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Error placing the order.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.rate * item.quantity, 0);

  return (
  
      <div className={styles.cartPage}>
        <h2 className={styles.salesmanName}>Salesman: {salesmanName}</h2>
        <h1 className={styles.cartTitle}>Your Cart</h1>

        {/* Shop Details Section */}
        {cartItems.length > 0 && shopDetails && (
          <div className={styles.shopDetailsSection}>
            <h3>Shop: {shopDetails.shopName}</h3>
            <p>Owner: {shopDetails.shopOwnerName}</p>
            <p>Address: {shopDetails.address}</p>
            <p>Contact: {shopDetails.contact}</p>
            <p>Region: {shopDetails.region}</p>
            <p>
              Location:{" "}
              <a href={shopDetails.location} target="_blank" rel="noopener noreferrer">
                Google Maps
              </a>
            </p>
          </div>
        )}

        {/* Cart Items Section */}
        <div className={styles.cartItemsSection}>
          {cartItems.length === 0 ? (
            <p className={styles.emptyCartMessage2}>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className={styles.cartItem2}>
                <img src={item.image} alt={item.name} className={styles.cartItemImg} />
                <div className={styles.cartDetails2}>
                  <h3>{item.name}</h3>
                  <p>Rate: ₹{item.rate}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>brand: {item.brand_name}</p>
                  <p>Total: ₹{item.rate * item.quantity}</p>
                  
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Subtotal Section */}
        {cartItems.length > 0 && (
          <div className={styles.subtotalSection}>
            <h3>Subtotal: ₹{calculateSubtotal()}</h3>
          </div>
        )}

        {/* Order Button Section */}
        {cartItems.length > 0 && (
          <div className={styles.orderButtonSection}>
            <button onClick={handleOrderAll} className={styles.orderButton}>
              Order All
            </button>
          </div>
        )}

        {/* Order Modal */}
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={`${styles.modalContent} ${styles.orderFormSection}`}>
              <h3>Order With FlipZonto</h3>

              {shopDetails && (
                <>
                  <h4>Shop Details</h4>
                  <div className={styles.formRow}>
                    <label>Shop Name:</label>
                    <input type="text" value={shopDetails.shopName} readOnly />
                  </div>
                  <div className={styles.formRow}>
                    <label>Owner:</label>
                    <input type="text" value={shopDetails.shopOwnerName} readOnly />
                  </div>
                  <div className={styles.formRow}>
                    <label>Address:</label>
                    <input type="text" value={shopDetails.address} readOnly />
                  </div>
                  <div className={styles.formRow}>
                    <label>Contact:</label>
                    <input type="text" value={shopDetails.contact} readOnly />
                  </div>
                  <div className={styles.formRow}>
                    <label>Region:</label>
                    <input type="text" value={shopDetails.region} readOnly />
                  </div>
                  <div className={styles.formRow}>
                    <label>Location:</label>
                    <input type="text" value={shopDetails.location} readOnly />
                  </div>
                </>
              )}

              <div className={styles.formRow}>
                <label>Order Date & Time:</label>
                <input
                  type="datetime-local"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </div>

              <div className={styles.formRow}>
                <label>Salesman Name:</label>
                <input type="text" value={salesmanName} readOnly />
              </div>

              <div className={styles.formRow}>
                <label>Salesman Contact:</label>
                <input
                  type="text"
                  value={salesmanContact}
                  onChange={(e) => setSalesmanContact(e.target.value)}
                />
              </div>

              <div className={styles.formRow}>
                <label>Comment:</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
              </div>

              <h4 className="styles.cartitems">Cart Items:</h4>
              {cartItems.map((item, index) => (
                <div key={index} className={styles.cartFormItem}>
                  <div className={styles.formRow}>
                    <label>Product:</label>
                    <input type="text" value={item.name} readOnly />
                  </div>
                  <div className={styles.formRow}>
                    <label>Rate (₹):</label>
                    <input type="number" value={item.rate} readOnly />
                  </div>
                  <div className={styles.formRow}>
                    <label>Quantity:</label>
                    <input type="number" value={item.quantity} readOnly />
                  </div>
                  <div className={styles.formRow}>
                    <label>Total (₹):</label>
                    <input type="number" value={item.rate * item.quantity} readOnly />
                  </div>
                </div>
              ))}

              <p className={styles.subtotal}>
                <strong>Subtotal: ₹{calculateSubtotal()}</strong>
              </p>

              <div className={styles.modalButtons}>
              <button onClick={() => setIsModalOpen(false)} className={styles.cancelButton}>
                  Cancle Order
                </button>

                <button onClick={handleOrderSubmit} className={styles.submitButton}>
                  {isLoading ? "Processing..." : "Submit Order"}
                  {isLoading && <div className={styles.loadingSpinner}></div>}
                </button>
                
              </div>
            </div>
          </div>
        )}

        {/*  Success GIF Overlay */}
        {showSuccessGif && (
          <div className={styles.successGifOverlay}>
            <img src={successGif} alt="Order Success" className={styles.successGif} />
          </div>
        )}
      </div>
  
  );
};

export default Cart;

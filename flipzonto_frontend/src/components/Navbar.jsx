
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiBox } from "react-icons/fi";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const uniqueItems = new Set(cart.map(item => item.id)).size;
      setCartCount(uniqueItems);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className={styles.navbar}>
      <span className={styles.shopBack} onClick={() => navigate(-1)}>
        &#8592; shop
      </span>

      <div className={styles.rightIcons}>
        <Link to="/myallordertrack" className={styles.navItem}>
          <FiBox className={styles.icon} />
        </Link>

        <Link to="/cart" className={`${styles.navItem} ${styles.cartIconWrapper}`}>
          <FiShoppingCart className={styles.icon} />
          {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import { useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import styles from "./BottomNavBar2.module.css";

const BottomNavBar2 = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.bottomNav}>
      <button onClick={() => navigate("/dashboard")} className={styles.navItem}>
        <FaHome /> <span>Home</span>
      </button>

      <button onClick={() => navigate("/cart")} className={styles.navItem}>
        <FaShoppingCart /> <span>Cart</span>
      </button>
    </div>
  );
};

export default BottomNavBar2;

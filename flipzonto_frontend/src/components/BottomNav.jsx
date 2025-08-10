import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";
import styles from "./BottomNav.module.css";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.bottomNav}>
      <button onClick={() => navigate("/dashboard")} className={styles.navItem}>
        <FaHome /> <span>Home</span>
      </button>

      <button onClick={() => navigate("/cart")} className={styles.navItem}>
        <FaShoppingCart /> <span>Cart</span>
      </button>
      <button
        onClick={() => navigate("/myallordertrack")}
        className={styles.navItem}
      >
        <FaClipboardList /> <span>Orders</span>
      </button>
      <button
        onClick={() => {
          window.dispatchEvent(new Event("focus-search"));
        }}
        className={styles.navItem}
      >
        <FaSearch /> <span>Search</span>
      </button>
    </div>
  );
};

export default BottomNav;

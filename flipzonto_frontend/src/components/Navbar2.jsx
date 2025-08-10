import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar2 = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <span className={styles.shopBack} onClick={() => navigate(-1)}>
        &#8592; Back
      </span>
    </nav>
  );
};

export default Navbar2;

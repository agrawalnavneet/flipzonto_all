import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

const regions = [
  { label: "North-Mon", value: "north-mon" },
  { label: "North-Tue", value: "north-tue" },
  { label: "East-Wed", value: "east-wed" },
  { label: "East-Thu", value: "east-thu" },
  { label: "South-Fri", value: "south-fri" },
  { label: "West-Sat", value: "west-sat" },
];

const userDetails = {
  Akash: {
    id: "68276cf448644db32bfa2a43",
    contact: "+91 9661461412",
    address: "Dhanbad, Jharkhand, India",
    joinDate: "2025-05-15",
    image: "https://ik.imagekit.io/secqprmji/a.jpg?updatedAt=1748857575728",
  },
  Chandan: {
    id: "user not verified",
    contact: "+91 9570031523",
    address: "user not verified",
    joinDate: "user not verified",
    image: "https://randomuser.me/api/portraits/women/44.jp",
  },
  Rony: {
    id: "684f84be96e5434003d91434",
    contact: "+91 9939400161",
    address: "Chaibasa, Jharkhand, India",
    joinDate: "15 June 2025",
    image: "https://ik.imagekit.io/cfpzzm9vy/rony.png?updatedAt=1750042409822",
  },
  Manish: {
    id: "6870005c0d393ac9c26785e1",
    contact: "+91 74794 40303",
    address: "Chaibasa, Jharkhand, India",
    joinDate: "11 July 2025",
    image: "https://ik.imagekit.io/cfpzzm9vy/TEAM%20(2)%20-%20Copy.png?updatedAt=1752171896922",
  },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.salesman_name?.trim() || "Guest";
  const userData = userDetails[username] || {};

  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");

  // Prevent rubber/stretch bounce
  useEffect(() => {
    const body = document.body;
    const originalOverscroll = body.style.overscrollBehaviorY;
    const originalTouchAction = body.style.touchAction;
    const originalWebkitScroll = body.style.webkitOverflowScrolling;

    body.style.overscrollBehaviorY = "none";
    body.style.touchAction = "manipulation";
    body.style.webkitOverflowScrolling = "auto";

    return () => {
      body.style.overscrollBehaviorY = originalOverscroll;
      body.style.touchAction = originalTouchAction;
      body.style.webkitOverflowScrolling = originalWebkitScroll;
    };
  }, []);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDateTime(
        now.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Prevent back navigation
  useEffect(() => {
    const handlePopState = () => {
      navigate("/dashboard", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        {/* 🔝 Top Navbar */}
        <header className={styles.navbar}>
          <button
            className={styles.hamburger}
            onClick={() => setShowSidebar(!showSidebar)}
          >
            ☰
          </button>
          <div className={styles.right}>
            <img
              src={userData.image}
              alt="User"
              className={styles.avatar}
              onClick={() => setShowProfile(!showProfile)}
            />
          </div>
        </header>

        {/* 📂 Sidebar Drawer */}
        <aside className={`${styles.sidebar} ${showSidebar ? styles.open : ""}`}>
          <button className={styles.closeBtn} onClick={() => setShowSidebar(false)}>
            ✖
          </button>
          <button className={`${styles.sidebarItem} ${styles.logout}`} onClick={handleLogout}>
            Logout
          </button>
          <button className={styles.sidebarItem} onClick={() => setShowProfile(!showProfile)}>
            My Profile
          </button>
        </aside>

        {/* 👤 Profile Card */}
        {showProfile && (
          <div className={styles.profileCard}>
            <img src={userData.image} alt="Profile" className={styles.profileImage} />
            <h3>{username}</h3>
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Contact:</strong> {userData.contact}</p>
            <p><strong>Address:</strong> {userData.address}</p>
            <p><strong>Joined:</strong> {userData.joinDate}</p>
          </div>
        )}

        {/* 📆 Date & Time */}
        <div className={styles.dateTime}>{currentDateTime}</div>

        {/* 📍 Region Section */}
        <section className={styles.regionSection}>
          <h3>Select a Region</h3>
          <div className={styles.regionGrid}>
            {regions.map((region, i) => (
              <button
                key={i}
                onClick={() => navigate(`/shops/${region.value}`)}
                className={styles.regionButton}
              >
                {region.label}
              </button>
            ))}
          </div>
        </section>

        {/* ➕ Add Shop */}
        <div className={styles.addShopContainer}>
          <button
            className={styles.addShopButton}
            onClick={() =>
              window.open("https://fzt-api-frilu457-3use.onrender.com/", "_blank")
            }
          >
            ➕ Add New Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

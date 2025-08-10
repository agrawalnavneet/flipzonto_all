import { useRef, useState, useEffect } from "react";
import "./PullToRefresh.css";

const PullToRefresh = ({ children }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleTouchStart = (e) => {
      if (window.scrollY === 0 && !isRefreshing) {
        startY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (startY.current !== null) {
        const distance = e.touches[0].clientY - startY.current;
        if (distance > 0) {
          setPullDistance(Math.min(distance, 100));
        }
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 60) {
        triggerRefresh();
      } else {
        resetPull();
      }
      startY.current = null;
    };

    const el = contentRef.current;
    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pullDistance, isRefreshing]);

  const triggerRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload(); // Simulated refresh
    }, 500);
  };

  const resetPull = () => {
    setPullDistance(0);
  };

  return (
    <div className="pull-container" ref={contentRef}>
      <div
        className={`refresh-indicator ${isRefreshing ? "active" : ""}`}
        style={{ transform: `translateY(${pullDistance}px)` }}
      >
        {isRefreshing ? (
          <div className="loader-wrapper">
            <div className="loader-circle"></div>
            <div className="panda">🐯</div>
          </div>
        ) : pullDistance > 0 ? (
          <div className="arrow">↓</div>
        ) : null}
      </div>

      <div style={{ transform: `translateY(${pullDistance}px)` }}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PullToRefresh;

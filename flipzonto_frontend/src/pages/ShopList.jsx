import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import "./ShopList.css";
import ButtonNav from "../components/BottomNav";

const ShopList = () => {
  const { region } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rawSearchTerm, setRawSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedVillage, setExpandedVillage] = useState(null);

  useEffect(() => {
    const handleFocusSearch = () => {
      searchInputRef.current?.focus();
    };

    window.addEventListener("focus-search", handleFocusSearch);
    return () => window.removeEventListener("focus-search", handleFocusSearch);
  }, []);

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

  useEffect(() => {
    if (location.state?.focusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get(
          `https://fzt-api-frilu457-3use.onrender.com/api/shops/${region}`,
          { withCredentials: true }
        );
        setShops(res.data.shops || []);
      } catch (err) {
        console.error("API fetch error:", err.message);
        setError("❌ Failed to load shops. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [region]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setSearchTerm(rawSearchTerm.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [rawSearchTerm]);

  const highlightText = (text) => {
    if (!text || typeof text !== "string") return "";
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="highlight-search">$1</span>');
  };

  const filteredSortedShops = useMemo(() => {
    return shops
      .filter((shop) => {
        if (!searchTerm) return true;
        return (
          shop.shopName?.toLowerCase().includes(searchTerm) ||
          shop.shopOwnerName?.toLowerCase().includes(searchTerm) ||
          shop.contact?.toLowerCase().includes(searchTerm) ||
          shop.address?.toLowerCase().includes(searchTerm)
        );
      })
      .sort((a, b) => a.shopName.localeCompare(b.shopName));
  }, [shops, searchTerm]);

  const groupedShops = useMemo(() => {
    const groups = {};
    filteredSortedShops.forEach((shop) => {
      const village = shop.village?.trim() || "No";
      if (!groups[village]) groups[village] = [];
      groups[village].push(shop);
    });
    return groups;
  }, [filteredSortedShops]);

  const handleShopClick = (shop) => {
    localStorage.setItem("selectedShop", JSON.stringify(shop));
    navigate(`/chooseproductandaddtocart/${region}/${shop._id}`);
  };

  return (
    <>
      <div className="shop-list-container">
        <div className="sticky-search">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search shops..."
            value={rawSearchTerm}
            onChange={(e) => setRawSearchTerm(e.target.value)}
          />
        </div>

        <h3>Shops in: {region}</h3>

        <p className="total-shop">Total Shops: {filteredSortedShops.length}</p>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <div className="shop-list-shimmer">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="shimmer-card">
                <div className="shimmer-image"></div>
                <div className="shimmer-content">
                  <div className="shimmer-line"></div>
                  <div className="shimmer-small-line"></div>
                  <div className="shimmer-small-line"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="shop-list">
            {Object.entries(groupedShops)
  .sort(([a], [b]) => a.localeCompare(b)) // ✅ Alphabetically sort by village name
  .map(([village, shops]) => (
    <div key={village} className="village-group">
      <div
        className="village-header"
        onClick={() =>
          setExpandedVillage(expandedVillage === village ? null : village)
        }
      >
        <strong>
          {village === "No"
            ? `No Village Name (${shops.length})`
            : `${village} (${shops.length})`}
        </strong>
        <span>{expandedVillage === village ? "▲" : "▼"}</span>
      </div>

      <div
        className={`shop-cards ${
          expandedVillage === village ? "expanded" : ""
        }`}
      >
        {expandedVillage === village &&
          shops.map((shop, index) => (
            <div
              key={index}
              className="shop-card-link"
              onClick={(e) => {
                e.preventDefault();
                handleShopClick(shop);
              }}
            >
              <div className="card">
                <img
                  src={shop.imageUrl || "https://via.placeholder.com/150"}
                  alt={shop.shopName}
                />
                <div className="card-content">
                  <div className="details">
                    <strong
                      className="shop-name"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(shop.shopName),
                      }}
                    ></strong>
                    <div className="shop-detail">
                      <strong>Owner: </strong>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightText(shop.shopOwnerName),
                        }}
                      ></span>
                    </div>
                    <div className="shop-detail">
                      <strong>Contact: </strong>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightText(shop.contact),
                        }}
                      ></span>
                    </div>
                    <div className="shop-detail">
                      <strong>Village: </strong>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightText(shop.village),
                        }}
                      ></span>
                    </div>
                    <div className="shop-detail">
                      <strong>Address: </strong>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightText(shop.address),
                        }}
                      ></span>
                    </div>
                    <div className="shop-detail">
                      <strong>Location: </strong>
                      <a
                        href={shop.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
))}

          </div>
        )}
      </div>

      <ButtonNav />
    </>
  );
};

export default ShopList;

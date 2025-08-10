

//NEW 20-06-2025

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./MyAllOrderTrack.module.css";
import Navbar2 from "../components/Navbar2";
// import BottomNav from "../components/BottomNav";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const isSameUTCDate = (date1, date2) => {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
};

const MyAllOrderTrack = () => {
  const storedUser = localStorage.getItem("user");
  const salesmanName = storedUser
    ? JSON.parse(storedUser).salesman_name
    : "Guest";

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalSold: 0,
    todaySold: 0,
    thisMonthSold: 0,
  });
  const [monthlySales, setMonthlySales] = useState(new Array(13).fill(0));
  const [monthlyDailySales, setMonthlyDailySales] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://admin.flipzonto.com/api/orders?salesmanName=${encodeURIComponent(
            salesmanName
          )}`
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setOrders(data);
          setFilteredOrders(data);
          calculateSalesData(data);
        } else {
          console.error("Expected array but got:", data);
          setOrders([]);
          setFilteredOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
        setFilteredOrders([]);
      }
    };

    const calculateSalesData = (orders) => {
      const today = new Date();
      const startOfMonth = new Date(
        Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)
      );
      const startOfNextMonth = new Date(
        Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 1)
      );

      let totalSold = 0,
        todaySold = 0,
        thisMonthSold = 0;
      let monthlyData = new Array(13).fill(0);
      let dailyByMonth = {};

      orders.forEach((order) => {
        const orderDate = new Date(order.orderDate);
        const orderMonth = orderDate.getUTCMonth();
        const orderDay = orderDate.getUTCDate();
        const orderYear = orderDate.getUTCFullYear();
        const orderMonthKey = `${orderYear}-${String(orderMonth + 1).padStart(
          2,
          "0"
        )}`;

        order.cartItems.forEach((item) => {
          const totalItemSale = item.rate * item.quantity;
          totalSold += totalItemSale;

          if (isSameUTCDate(orderDate, today)) {
            todaySold += totalItemSale;
          }

          if (orderDate >= startOfMonth && orderDate < startOfNextMonth) {
            thisMonthSold += totalItemSale;
          }

          if (
            orderDate >= new Date("2025-01-01T00:00:00Z") &&
            orderDate <= new Date("2026-01-31T23:59:59Z")
          ) {
            if (orderYear === 2025) {
              monthlyData[orderMonth] += totalItemSale;
            } else if (orderYear === 2026 && orderMonth === 0) {
              monthlyData[12] += totalItemSale;
            }
          }

          if (!dailyByMonth[orderMonthKey]) {
            dailyByMonth[orderMonthKey] = new Array(31).fill(0);
          }
          dailyByMonth[orderMonthKey][orderDay - 1] += totalItemSale;
        });
      });

      setDashboardData({ totalSold, todaySold, thisMonthSold });
      setMonthlySales(monthlyData);
      setMonthlyDailySales(dailyByMonth);
    };

    fetchOrders();
  }, [salesmanName]);

  const handleDateChange = (e) => {
    const selectedDateObj = new Date(e.target.value);
    setSelectedDate(e.target.value);

    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      return isSameUTCDate(orderDate, selectedDateObj);
    });

    setFilteredOrders(filtered);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const availableMonths = Object.keys(monthlyDailySales).sort();
  const selectedDailyData = monthlyDailySales[selectedMonth] || [];

  const monthlyChartData = {
    labels: [
      "Jan 2025",
      "Feb 2025",
      "Mar 2025",
      "Apr 2025",
      "May 2025",
      "Jun 2025",
      "Jul 2025",
      "Aug 2025",
      "Sep 2025",
      "Oct 2025",
      "Nov 2025",
      "Dec 2025",
      "Jan 2026",
    ],
    datasets: [
      {
        label: "Monthly Sales (₹)",
        data: monthlySales,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const dailyChartData = {
    labels: Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: `Daily Sales for ${selectedMonth}`,
        data: selectedDailyData,
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        <Navbar2 />
        <h2>My Order Track</h2>
        <div className={styles.dashboardContainer}>
          <p className={styles.welcomeText}>Welcome, {salesmanName}!</p>

          <div className={styles.dashboardSummary}>
            <div className={styles.summaryCard}>
              <h4>Total Products Sold</h4>
              <p>₹ {dashboardData.totalSold.toFixed(2)}</p>
            </div>
            <div className={styles.summaryCard}>
              <h4>Today's Sales</h4>
              <p>₹ {dashboardData.todaySold.toFixed(2)}</p>
            </div>
            <div className={styles.summaryCard}>
              <h4>This Month's Sales</h4>
              <p>₹ {dashboardData.thisMonthSold.toFixed(2)}</p>
            </div>
          </div>

          <div className={styles.chartSection}>
            <h4>Sales Data (Monthly)</h4>
            <Bar
              data={monthlyChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  tooltip: { callbacks: { label: (ctx) => `₹${ctx.raw}` } },
                },
                scales: {
                  y: { beginAtZero: true, ticks: { callback: (v) => `₹${v}` } },
                },
              }}
            />
          </div>

          <div className={styles.chartSection}>
            <h4>Daily Sales (Select Month)</h4>
            <select value={selectedMonth} onChange={handleMonthChange}>
              <option value="">-- Select Month --</option>
              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {new Date(month + "-01").toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </option>
              ))}
            </select>
            {selectedMonth && (
              <Bar
                data={dailyChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    tooltip: { callbacks: { label: (ctx) => `₹${ctx.raw}` } },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { callback: (v) => `₹${v}` },
                    },
                  },
                }}
              />
            )}
          </div>

          <div className={styles.filterSection}>
            <label htmlFor="filter-date">Select Date:</label>
            <input
              type="date"
              id="filter-date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>

          <div className={styles.ordersSection}>
            {!selectedDate ? (
              <p className={styles.noOrders}>
                Please select a date to view your orders.
              </p>
            ) : filteredOrders.length === 0 ? (
              <p className={styles.noOrders}>
                No orders found for the selected date.
              </p>
            ) : (
              filteredOrders.map((order) => (
                <div key={order._id} className={styles.orderCard}>
                  <h3>🛒 Shop: {order.shopDetails.shopName}</h3>
                  <p>
                    <strong>Contact:</strong> {order.shopDetails.contact}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.shopDetails.address}
                  </p>
                  {/* <p>
                   
                    <strong>Location:</strong> {order.shopDetails.location}
                  </p> */}
                  <p>
                    <strong>Location:</strong>{" "}
                    <a
                      href={order.shopDetails.location}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Map
                    </a>
                  </p>

                  {/* WRITE LOCATION TO ANCHOR TAG */}

                  <hr />
                  {/* <p>
                    <strong>Order Date (IST):</strong>{" "}
                    {new Date(order.orderDate).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </p> */}

                  <p>
                    <strong>Order Date (UTC):</strong>{" "}
                    {new Date(order.orderDate).toLocaleString("en-GB", {
                      timeZone: "UTC",
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </p>

                  <p>
                    <strong>Comment:</strong> {order.comment || "—"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {order.shipped ? "Dilevered" : "Not Dilevered ❌"}
                  </p>
                  <div className={styles.cartItemsGrid}>
                    {order.cartItems.map((item, index) => (
                      <div key={index} className={styles.cartItemCard}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.itemImage}
                        />
                        <h4>{item.name}</h4>
                        <p>Rate: ₹{item.rate}</p>
                        <p>Quantity: {item.quantity}</p>
                        {/* <p>Category: {item.category}</p> */}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAllOrderTrack;

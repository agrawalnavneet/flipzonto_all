//BRANCH SELECTOR
//BRANCH SELECTOR
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/flipzonto.svg";
import styles from "./Login.module.css";

const Login = () => {
  const [salesman_name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingAuthCheck, setLoadingAuthCheck] = useState(true);
  const [branch, setBranch] = useState(() => {
    return localStorage.getItem("selected_branch") || "Chaibasa";
  });

  const [isRefreshing] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    if (!salesman_name || !password) {
      toast.warn("Username and password are required.");
      return;
    }

    if (!agreed) {
      toast.warn("Please agree to the terms and conditions before logging in.");
      return;
    }

    if (branch !== "Chaibasa") {
      toast.warning(
        <span>
          Dear team!{" "}
          <strong style={{ color: "red", textDecoration: "underline" }}>
            {branch}
          </strong>{" "}
          branch is not operational yet. Launching soon... Kindly select another branch.
        </span>
      );
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://admin.flipzonto.com/salesman-auth/login",
        { salesman_name, password },
        { withCredentials: true }
      );

      if (res.data.token && res.data.name) {
        localStorage.setItem("salesman_token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ salesman_name: res.data.name })
        );
        setUser({ salesman_name: res.data.name });

        toast.success("Login successful");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error(res.data.message || " Login failed");
      }
    } catch (err) {
      if (err.response?.status === 429) {
        toast.error("Too many login attempts. Please try again later.");
      } else if (err.response?.status === 401) {
        toast.error("Invalid username or password.");
      } else {
        toast.error(err.response?.data?.message || "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("salesman_token");
    const user = localStorage.getItem("user");

    if (token && user) {
      const parsedUser = JSON.parse(user);
      setUser({ salesman_name: parsedUser.salesman_name });
      navigate("/dashboard");
    } else {
      setLoadingAuthCheck(false);
    }
  }, [navigate, setUser]);

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Helmet>

      {loadingAuthCheck ? (
        <div className={styles.authLoaderWrapper}>
          <div className={styles.authSpinner}></div>
        </div>
      ) : (
        <div>
          <div className={styles.navbar}>
            <img src={logo} alt="Company Logo" />
          </div>

          <div
            className={`${styles.loginContainer} ${
              isRefreshing ? "refreshing" : ""
            }`}
          >
            <div className={styles.loginBox}>
              <h4 className={styles.loginTitle}>Salesman Login</h4>

              <label
                htmlFor="branch-select"
                style={{ fontWeight: "bold", marginRight: "10px" }}
              >
                Branch:
              </label>
              <select
                id="branch-select"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  backgroundColor: "#f9f9f9",
                  outline: "none",
                  cursor: "pointer",
                  marginBottom: "20px",
                }}
              >
                <option value="Chaibasa">Chaibasa</option>
                <option value="Dhanbad">Dhanbad</option>
                <option value="Jamtara">Jamtara</option>
                <option value="Jhumri Telaiya">Jhumri Telaiya</option>
                <option value="Tata-Jamshedpur">Tata-Jamshedpur</option>
              </select>

              <input
                type="text"
                placeholder="Enter Username"
                value={salesman_name}
                onChange={(e) => setName(e.target.value)}
                className={styles.inputField}
                required
              />

              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                  style={{ paddingRight: "40px" }}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordEye}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </span>
              </div>

              <div className={styles.termsCheckbox}>
                <label>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                  />
                  <span>
                    &nbsp;I know the terms and conditions of{" "}
                    <strong>flipzonto.com</strong> and understand that my{" "}
                    <strong>each click, location, and activity</strong> may be
                    tracked by the team <strong>FreelancerPro INDIA</strong>. I
                    agree to all terms and conditions.
                  </span>
                </label>
              </div>

              <button
                onClick={handleLogin}
                className={styles.loginButton}
                disabled={loading}
              >
                {loading ? <div className={styles.loginSpinner}></div> : "Login"}
              </button>
            </div>
          </div>

          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Login;










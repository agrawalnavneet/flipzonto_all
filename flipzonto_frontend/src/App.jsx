import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ShopList from './pages/ShopList';
import ChooseProductAndAddToCart from './pages/ChooseProductAndAddToCart';
import ProtectedRoute from './components/ProtectedRoute';
import Cart from './pages/Cart';
import MyAllOrderTrack from './pages/MyAllOrderTrack';
import AnimatedPage from './components/AnimatedPage';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Login /></AnimatedPage>} />
          <Route path="/dashboard" element={<ProtectedRoute><AnimatedPage><Dashboard /></AnimatedPage></ProtectedRoute>} />
          <Route path="/shops/:region" element={<ProtectedRoute><AnimatedPage><ShopList /></AnimatedPage></ProtectedRoute>} />
          <Route path="/chooseproductandaddtocart/:region/:shopId" element={<ProtectedRoute><AnimatedPage><ChooseProductAndAddToCart /></AnimatedPage></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><AnimatedPage><Cart /></AnimatedPage></ProtectedRoute>} />
          <Route path="/myallordertrack" element={<ProtectedRoute><AnimatedPage><MyAllOrderTrack /></AnimatedPage></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

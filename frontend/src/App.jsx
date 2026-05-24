import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Sheba Platform
import ShebaLandingPage from "./pages/sheba/ShebaLandingPage";

// Legacy Pages
import HomePage from "./pages/user/HomePage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Layout from "./pages/Layout";
import ProfilePage from "./pages/user/ProfilePage";
import ProductPage from "./pages/user/ProductPage";
import CartPage from "./pages/user/CartPage";
import ShopPage from "./pages/user/ShopPage";

// Admin routes
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import UserManagement from "./pages/admin/UserManagement";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import AdminProfile from "./pages/admin/AdminProfile";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen">
      <Routes>
        {/* Sheba Platform - Main Route */}
        <Route path="/" element={<ShebaLandingPage />} />

        {/* Legacy E-commerce Routes */}
        <Route element={<Layout />}>
          <Route path="/shop" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product-list" element={<ShopPage />} />
          <Route element={<ProtectedRoute roles={['customer', 'admin', 'seller']} />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id" element={<ProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Route>

        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

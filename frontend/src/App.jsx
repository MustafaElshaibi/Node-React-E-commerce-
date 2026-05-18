// utility routes
import { Routes, Route } from "react-router";
import HomePage from "./pages/user/HomePage";
import { Toaster } from "@/components/ui/sonner";
import ErrorToaster from "./utility/ErrorToaster";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import { api } from "./redux/api/api";
import Cookies from "universal-cookie";
import store from "./redux/store";
// auth routes
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

// user routes
import Layout from "./pages/Layout";
import ProfilePage from "./pages/user/ProfilePage";
import ProductPage from "./pages/user/ProductPage";
import CartPage from "./pages/user/CartPage";
import ShopPage from "./pages/user/ShopPage";

// admin routes
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

  console.log(user)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (accessToken && !user) {
  //       const res = await store.dispatch(api.endpoints.getProfile.initiate());
  //       // dispatch(setUser({user: profileData?.data?.user}));
  //       dispatch(
  //         setUser({
  //           user: res?.data?.data?.user,
  //         })
  //       );
  //     }
  //   };
  //   fetchData();
  // }, [dispatch]);

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* <ToastContainer limit={3} /> */}
        <Toaster position="top-left" />
        <ErrorToaster />

        <Routes>
          {/* user routes  */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<ShopPage />} />
            {/* protected Rootes  */}
            <Route element={<ProtectedRoute roles={['customer', 'admin', 'seller']} />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* admin routes  */}
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

          {/* // Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

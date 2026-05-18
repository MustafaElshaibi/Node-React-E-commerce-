import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import UserManagement from './pages/UserManagement';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import AdminProfile from './pages/AdminProfile';
import './App.css';

function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;


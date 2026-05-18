import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useLogoutMutation } from '@/redux/api/authApi';
import { useDispatch } from 'react-redux';
import { logOut } from '@/redux/features/authSlice';
import { toast } from 'sonner';

const AdminSidebar = ({setSidebarOpen}) => {
  const [logOutMutaion] = useLogoutMutation()
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async ()=> {
    await logOutMutaion().unwrap();
    dispatch(logOut());
    toast.success("logged Out Successfuly");
    navigate('/', {replace: true})
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Package, label: 'Products', path: '/admin/dashboard/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/dashboard/orders' },
    { icon: Users, label: 'Users', path: '/admin/dashboard/users' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/dashboard/analytics' },
    { icon: Settings, label: 'Settings', path: '/admin/dashboard/settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-black">S2oqMart</h1>
        <p className="text-sm text-gray-500">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={()=> setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button onClick={handleLogOut} variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;


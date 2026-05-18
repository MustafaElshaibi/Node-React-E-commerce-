import React, { useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Package,
  Heart,
  CreditCard,
  Settings,
  Shield,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useSelector } from "react-redux";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/authApi";
import { toast } from "sonner";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ProfilePage = () => {
  const { data, isLoading } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [previewAvatar, setPreviewAvatar] = useState(null);
const [profileData, setProfileData] = useState([]);

const [tempData, setTempData] = useState(profileData);
useEffect(() => {
  if (data?.data?.user) {
    const user = data.data.user;
    const upData = {
      ...user,
    }
    if(user?.profile?.avatar) setPreviewAvatar(user?.profile?.avatar);
    setProfileData(upData);
  setTempData(upData);
  }
}, [data]);


  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = async () => {
    try {
    let formData;
      formData = new FormData();
      Object.entries(tempData).forEach(([key, value]) => {
         if (key !== 'avatar' && value !== null) {
           if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          // For nested objects (like profile), flatten keys
          Object.entries(value).forEach(([k, v]) => {
            formData.append(`${key}.${k}`, v);
          });
        } else if (Array.isArray(value)) {
          // For address array, flatten first address
          if (key === "address" && value.length > 0) {
            Object.entries(value[0]).forEach(([k, v]) => {
              formData.append(`address[0].${k}`, v);
            });
          }
        } else {
          formData.append(key, value);
        }
         }
      });
    

    // Append avatar if exists
    if (tempData.avatar) {
      formData.append('avatar', tempData.avatar); // Field name must match Multer's field name
    }
    await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (path, value) => {
  setTempData(prev => {
    // Split path into keys (e.g., ['profile', 'phone'])
    const keys = path.split('.');
    
    // If it's a top-level field (no dot), update directly
    if (keys.length === 1) {
      return { ...prev, [path]: value };
    }

    // Create a deep copy of the state using recursion
    const updateNestedState = (obj, keys, value, depth = 0) => {
      // Shallow copy the current level
      const newObj = Array.isArray(obj) ? [...obj] : { ...obj };
      
      // Last key? Set the value
      if (depth === keys.length - 1) {
        newObj[keys[depth]] = value;
        return newObj;
      }
      
      // Recursively update nested objects/arrays
      newObj[keys[depth]] = updateNestedState(
        obj[keys[depth]] || {}, // Handle missing paths
        keys,
        value,
        depth + 1
      );
      
      return newObj;
    };

    return updateNestedState(prev, keys, value);
  });
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIsEditing(true);
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Please upload an image (JPEG, PNG, GIF, WEBP)"
        );
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }
      setTempData(prev => ({...prev, avatar: file}));

      // create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



  const orders = [
    {
      id: "#ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: "$299.99",
      items: 2,
    },
    {
      id: "#ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: "$149.99",
      items: 1,
    },
    {
      id: "#ORD-003",
      date: "2024-01-05",
      status: "Processing",
      total: "$89.99",
      items: 3,
    },
    {
      id: "#ORD-004",
      date: "2023-12-28",
      status: "Delivered",
      total: "$199.99",
      items: 1,
    },
  ];

  const wishlistItems = [
    {
      id: 1,
      name: "Modern Accent Chair",
      price: "$299.99",
      image: "/api/placeholder/200/200",
    },
    {
      id: 2,
      name: "Minimalist Floor Lamp",
      price: "$149.99",
      image: "/api/placeholder/200/200",
    },
    {
      id: 3,
      name: "Wooden Coffee Table",
      price: "$399.99",
      image: "/api/placeholder/200/200",
    },
    {
      id: 4,
      name: "Decorative Vase",
      price: "$79.99",
      image: "/api/placeholder/200/200",
    },
  ];

  const tabs = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "orders", label: "Order History", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  const renderProfileTab = () => (
    <div className="space-y-8">
      {
        isLoading ? (
           <>
           {/* Profile Header Skeleton */}
    <div className="flex items-center space-x-6">
      <div className="relative">
        <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse" />
      </div>
      
      <div className="space-y-3 flex-1">
        <div className="h-7 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
      </div>
      
      <div className="ml-auto">
        <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>

    {/* Personal Information Skeleton */}
    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-10 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>

    {/* Address Information Skeleton */}
    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
          <div className="h-10 bg-gray-200 rounded-lg" />
        </div>
        
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
            <div className="h-10 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
           </>
        ) 
        : (
          <>
          <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {previewAvatar ? (
              <img
                src={previewAvatar}
                alt="avatar"
                className="w-full h-full object-cover rounded-full p-1"
              />
            ) : (
              <User className="h-12 w-12 text-gray-400" />
            )}
          </div>
          <input
            type="file"
            name="avatar-img"
            id="avatar"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <label
            htmlFor="avatar"
            className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Camera className="h-4 w-4" />
          </label>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {profileData?.firstName} {profileData?.lastName}
          </h2>
          <p className="text-gray-600">{profileData?.email}</p>
          <p className="text-sm text-gray-500">{profileData?.createdAt}</p>
        </div>
        <div className="ml-auto">
          {!isEditing ? (
            <Button onClick={handleEdit} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                onClick={handleSave}
                className="bg-black text-white hover:bg-gray-800"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempData?.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{profileData?.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempData?.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{profileData?.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={tempData?.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-gray-900">{profileData?.email}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={tempData?.profile?.phone}
                onChange={(e) => handleInputChange("profile.phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-gray-900">{profileData?.profile?.phone}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            {isEditing ? (
              <input
                type="date"
                value={tempData?.profile?.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("profile.dateOfBirth", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-gray-900">
                  {new Date(profileData?.profile?.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Address Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempData?.address?.[0]?.street}
                onChange={(e) => handleInputChange("address.0.street", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-gray-900">{profileData?.address?.[0]?.street}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempData?.address?.[0]?.city}
                onChange={(e) => handleInputChange("address.0.city", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{profileData?.address?.[0]?.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempData?.address?.[0]?.state}
                onChange={(e) => handleInputChange("address.0.state", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{profileData?.address?.[0]?.state}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ZIP Code
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempData?.address?.[0]?.postalCode}
                onChange={(e) => handleInputChange("address.0.postalCode", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{profileData?.address?.[0]?.postalCode}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            {isEditing ? (
              <select
                value={tempData?.address?.[0]?.country}
                onChange={(e) => handleInputChange("address.0.country", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Yemen">Yemen</option>
              </select>
            ) : (
              <p className="text-gray-900">{profileData?.address?.[0]?.country}</p>
            )}
          </div>
        </div>
      </div>
          </>
        )
      }

      
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
            <option>All Orders</option>
            <option>Delivered</option>
            <option>Shipped</option>
            <option>Processing</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-900">{order.id}</h4>
                <p className="text-sm text-gray-500">Placed on {order.date}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {order.items} item{order.items > 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{order.total}</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "Processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              {order.status === "Delivered" && (
                <Button variant="outline" size="sm">
                  Reorder
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWishlistTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">My Wishlist</h3>
        <p className="text-sm text-gray-500">{wishlistItems.length} items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden group"
          >
            <div className="aspect-square bg-gray-100 relative">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Product Image</span>
              </div>
              <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-2">{item.name}</h4>
              <p className="text-lg font-semibold text-gray-900 mb-3">
                {item.price}
              </p>
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
        <Button className="bg-black text-white hover:bg-gray-800">
          Add New Card
        </Button>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/26</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm">
                Remove
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Default
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">MC</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">•••• •••• •••• 8888</p>
                <p className="text-sm text-gray-500">Expires 08/25</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>

      <div className="space-y-6">
        {/* Security Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Change Password</p>
                <p className="text-sm text-gray-500">
                  Update your account password
                </p>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security
                </p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </h4>
          <div className="space-y-4">
            {[
              {
                label: "Order Updates",
                description: "Get notified about your order status",
              },
              {
                label: "Promotions",
                description: "Receive emails about sales and promotions",
              },
              {
                label: "New Products",
                description: "Be the first to know about new arrivals",
              },
              {
                label: "Newsletter",
                description: "Weekly newsletter with tips and trends",
              },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={index < 2}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4">Account Actions</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Download Your Data</p>
                <p className="text-sm text-gray-500">
                  Get a copy of your account data
                </p>
              </div>
              <Button variant="outline">Download</Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-red-600">Delete Account</p>
                <p className="text-sm text-gray-500">
                  Permanently delete your account and data
                </p>
              </div>
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "orders":
        return renderOrdersTab();
      case "wishlist":
        return renderWishlistTab();
      case "payment":
        return renderPaymentTab();
      case "settings":
        return renderSettingsTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

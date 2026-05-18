// src/components/ui/BreadcrumbWithCustomSeparator.jsx
import React from 'react';
import { Link, useLocation, matchPath, Route } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const customLabels = {
  '/products': 'All Products',
  '/products/:productId': 'Product Detail', // Will show "Product Detail" for product pages
  '/category': 'Product Categories',
  '/category/:categoryId': 'Category', // Will show "Category Name" when param is passed
  '/account': 'My Account',
  '/cart': 'Shopping Cart',
  '/checkout': 'Checkout Process',
  '/wishlist': 'My Wishlist',
  '/orders': 'Order History',
  '/admin/dashboard': 'Admin Dashboard',
  '/admin/dashboard/products': 'Manage Products',
  '/admin/dashboard/products/:id': 'Product Details',
  '/admin/dashboard/orders': 'Manage Orders',
  '/admin/dashboard/users': 'Manage Users',
  '/admin/dashboard/categories': 'Manage Categories',
  '/admin/dashboard/settings': 'Site Settings',
  
};

// const getRouteLabel = (path, params = {}) => {
//   // 1. Check for exact match in custom labels
//   if (customLabels[path]) return customLabels[path];
  
//   // 2. Handle parameterized routes
//   const match = matchPath(path, Object.keys(customLabels));
//   console.log("match", Object.keys(customLabels))
//   if (match) {
//     const basePath = match.path;
//     if (customLabels[basePath]) {
//       // Replace placeholders with actual values
//       return customLabels[basePath].replace(/:(\w+)/g, (_, key) => params[key] || key);
//     }
//   }
  
//   // 3. Default behavior: format the path segment
//   const segment = path.split('/').pop();
//   return segment
//     .replace(/-/g, ' ')
//     .replace(/\b\w/g, c => c.toUpperCase());
// };


// Helper to match parameterized routes


function getRouteLabel(path, params = {}) {
  // 1. Exact match
  if (customLabels[path]) return customLabels[path];
  // 2. Parameterized match
  for (const key of Object.keys(customLabels)) {
    if (key.includes(':')) {
      // Convert '/category/:categoryId' to regex
      const regex = new RegExp('^' + key.replace(/:\w+/g, '[^/]+') + '$');
      if (regex.test(path)) {
        // Replace placeholders with actual values
        return customLabels[key].replace(/:(\w+)/g, (_, k) => params[k] || k);
      }
    }
  }

  // 3. Default: prettify last segment
  const segment = path.split('/').pop();
  return segment
    ? segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'Home';
}


export function BreadcrumbWithCustomSeparator() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
  // Get route parameters (if any)
  const routeParams = location.state?.routeParams || {};
 
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Always show Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="hover:underline">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {pathnames.map((name, index) => {
          // Skip 'admin' segment
          if (name === 'admin') return null;

          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = getRouteLabel(routeTo, routeParams);
          return (
            <React.Fragment key={routeTo}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link 
                      to={routeTo} 
                      state={{ routeParams }}
                      className="hover:underline"
                    >
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
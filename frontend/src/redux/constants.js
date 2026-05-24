const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const USERS_URL = '/api/users';
const AUTH_URL = '/api/auth';
const PRODUCTS_URL = '/api/products';
const CATEGORY_URL = '/api/categories';
const REFRESHTOKEN = AUTH_URL + '/refresh';

export {
  BASE_URL,
  USERS_URL,
  AUTH_URL,
  REFRESHTOKEN,
  PRODUCTS_URL,
  CATEGORY_URL
}

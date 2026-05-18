import React, {  useMemo, useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  MoreHorizontal,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useCreateProductMutation, useDeleteProductMutation, useGetAllProductsQuery, useUpdateProductMutation } from '@/redux/api/productsApi';
import { useGetAllCategoriesQuery } from '@/redux/api/categoryApi';
import ProductModal from '@/components/admin/ProductModal';
import { Link } from 'react-router';
import { toast } from 'sonner';

import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

const ProductManagement = () => {
  const [filter, setFilter] = useState({
    search: '',
    category: '',
    page: 1,
    limit: 10,
    fields: '',
    sort: ''
  });
  const {data, isLoading, isFetching} = useGetAllProductsQuery(filter)
  const {data: cat} = useGetAllCategoriesQuery()
  const [updateProduct] = useUpdateProductMutation();
  const [createProduct] = useCreateProductMutation();
  const Products = useMemo(()=> data?.data?.products, [data]);
  const pagination = useMemo(()=> data?.data?.pagination, [data]);
  const categories = useMemo(()=> cat?.data?.categories, [cat]);
 
  const handleSaveProduct = async (productData) => {
    if (productData.get('id')) {
      return await updateProduct({id: productData.get('id'), data:productData});
    } else {
      return await createProduct(productData);
    }
  };

  


  if(isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
  {/* Page Header Skeleton */}
  <div className="flex justify-between items-center">
    <div className="space-y-2">
      <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      <div className="h-4 w-80 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
    </div>
    <div className="h-10 w-36 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
  </div>

  {/* Stats Cards Skeleton */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
            <div className="h-7 w-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    ))}
  </div>

  {/* Filters and Search Skeleton */}
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
      </div>
      <div className="h-10 w-44 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
  </div>

  {/* Products Table Skeleton */}
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {[...Array(7)].map((_, i) => (
              <th key={i} className="px-6 py-3">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded-md mx-auto"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {[...Array(5)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg mr-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  </div>
                </div>
              </td>
              {[...Array(6)].map((_, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4">
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Pagination Skeleton */}
  <div className="flex items-center justify-between">
    <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
    <div className="flex space-x-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      ))}
    </div>
  </div>
</div>
    )
  }


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Manage your product inventory and details</p>
        </div>
       <ProductModal
       categories={categories}
       onSave={handleSaveProduct}
       >
         <Button 
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
       </ProductModal>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{pagination?.totalItems}</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {Products.filter(p => p.stock > 0 && p.stock > 5).length}
              </p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {Products.filter(p => p.stock > 0 && p.stock <= 5).length}
              </p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {Products.filter(p => p.stock === 0).length}
              </p>
            </div>
            <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={filter.search}
              onChange={(e) => setFilter({...filter, search: e.target.value})}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-full"
            />
          </div>
          <select
            value={filter.category}
            onChange={(e) => setFilter({...filter, category:e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            {categories?.map(category => (
              <option key={category._id} value={category._id}>
                {category === 'all' ? 'All Categories' : category.name}
              </option>
            ))}
          </select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Products Table */}
      {
        isFetching ? 
        (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {[...Array(7)].map((_, i) => (
              <th key={i} className="px-6 py-3">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded-md mx-auto"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {[...Array(5)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg mr-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  </div>
                </div>
              </td>
              {[...Array(6)].map((_, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4">
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
        ):
        (
<div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Products.map((product) => (
                <ProductCard key={product._id} product={product} categories={categories} handleSaveProduct={handleSaveProduct} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
        )
        
      }
      

      {/* Pagination */}
     <Pagination pagination={pagination} setFilter={setFilter} />
    </div>
  );
};

export default ProductManagement;


const ProductCard = ({product, categories, handleSaveProduct})=> {
  const [deleteProduct] = useDeleteProductMutation();
    const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const statusProd = product?.stock === 0  ? "Out Of Stock": product?.stock > 0 && product?.stock <= 5 ? "Low Stock" : "Active";

  const handleDelete = async ()=> {
   try {
     await deleteProduct(product?._id).unwrap();
    toast.success("Product Deleted Successfuly");
   } catch (error) {
    toast.error(error.message ||"Faild to Delete Prodouct Successfuly");
   }
  }

  return (
    <tr  className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center overflow-hidden">
                      {
                        product?.image ? (
                          <img src={product?.image} alt={product?.title} className=' h-12 w-12 rounded-lg mr-4 object-cover' />
                        )
                        : 
                        (
                          <div className="h-12 w-12 bg-gray-200 rounded-lg mr-4"></div>
                        )
                      }
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product?.title}</div>
                        <div className="text-sm text-gray-500">Created: {product.createdAt}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product?._id?.slice(-5)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product?.category?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(statusProd)}`}>
                      {statusProd}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">

                      {/* show product icon  */}
                      <Link to={`/admin/dashboard/products/${product._id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      </Link>

                      {/* update product icon  */}
                      <ProductModal
                      product={product}
                      categories={categories}
                      onSave={handleSaveProduct}
                      >
                        <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      </ProductModal>

                      {/* Delete Product Icon  */}
                      <DeleteConfirmDialog
                      handler={handleDelete}
                      >
                         <Button  variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      </DeleteConfirmDialog>
                      
                    </div>
                  </td>
                </tr>
  )
}

const Pagination = ({ pagination, setFilter }) => {
  // Generate page buttons based on totalPages
  const renderPageButtons = () => {
    if (pagination.totalPages <= 0) {
      return (
        <Button variant="outline" disabled size="sm">
          No pages
        </Button>
      );
    }

    return Array.from({ length: pagination.totalPages }, (_, index) => {
      const pageNumber = index + 1;
      const isActive = pageNumber === pagination.currentPage;
      
      return (
        <Button
          key={pageNumber}
          variant="outline"
          onClick={()=> setFilter(prev => ({...prev, page: pageNumber}))}
          className={`
            ${isActive 
              ? 'bg-pink-500 text-white hover:bg-pink-500/70 hover:text-white' 
              : ''}
          `}
          size="sm"
        >
          {pageNumber}
        </Button>
      );
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Showing {Math.min(pagination.itemsPerPage, pagination.totalItems)} of{' '}
        {pagination.totalItems} products
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={()=> setFilter(prev=> ({...prev, page: +pagination.currentPage - 1 }))}
          disabled={!pagination.hasPrevPage} 
          size="sm"
        >
          Previous
        </Button>
        {renderPageButtons()}
        <Button 
          variant="outline" 
           onClick={()=> setFilter(prev=> ({...prev, page: +pagination.currentPage + 1 }))}
          disabled={!pagination.hasNextPage} 
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};


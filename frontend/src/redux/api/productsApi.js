import { PRODUCTS_URL } from "../constants";
import { api } from "./api";
const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params = {}) => {
        const defaultParams = {
          page: 1,
          limit: 10,
          sort: "-createdAt",
          ...params,
        };

        const queryParams = new URLSearchParams();

        Object.entries(defaultParams).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });

        return {
          url: `${PRODUCTS_URL}?${queryParams.toString()}`,
          method: "GET",
        };
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      // merge: (currentCache, newItems) => {
      //   console.log([...currentCache])
      //   // When changing filters, replace the cache instead of appending
      //   if (newItems.isNewQuery) {
      //     return newItems.data.products;
      //   }
      //   return [...currentCache, ...newItems.data.products];
      // },
      forceRefetch: ({ currentArg, previousArg }) => {
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
      },
      providesTags: (result) =>
        result
          ? [
              result.data.products.map(({ _id }) => ({
                type: "Product",
                id: _id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    addReview: builder.mutation({
      query: ({id, data}) => ({
        url: `${PRODUCTS_URL}/${id}/reviews`,
        method: "POST",
        body: data,
      }),
    }),
    deleteReview: builder.mutation({
      query: ({id, reviewId}) => ({
        url: `${PRODUCTS_URL}/${id}/review/${reviewId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useAddReviewMutation,
  useDeleteReviewMutation,
} = productsApi;

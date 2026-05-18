import { CATEGORY_URL } from '../constants';
import {api} from './api';
const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: ()=> ({
        url: CATEGORY_URL,
        method: 'GET'
      }),
      providesTags: ['Category']
    })
    
  })
});

export const {useGetAllCategoriesQuery} = categoriesApi;
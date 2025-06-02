import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import  { type Product } from '../pages/Home'

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl:'https://fakestoreapi.com/'

}),
    endpoints: (builder) => ({
        getFeaturedProduct: builder.query<Product, void>({
            query: () => 'products'
        }),
        getProduct: builder.query<Product, string>({
            query: (id) => `products/${id}`
        })
    })
})

export const{ useGetFeaturedProductQuery, useGetProductQuery } = api

export default api
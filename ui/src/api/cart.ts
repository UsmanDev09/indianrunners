import { Challenge } from '@/pages/api';
import api from './index'

export const getCartAPI = () => api.get(`${process.env.SERVER_DOMAIN}/api/cart`).then((response) => response.data) 

export const removeChallengeFromCartAPI = (challenge: Challenge, _id: number) => 
  api
    .delete(`${process.env.SERVER_DOMAIN}/api/cart/challenge`, {
        data: {
          itemDetails: [{ challenge: { _id: challenge?._id } }],
          _id,
        },
    })

export const removeProductFromCartAPI = (productId: number, _id: number) => 
  api
    .delete(`${process.env.SERVER_DOMAIN}/api/cart/product`, {
        data: {
            itemDetails: [{ product: { _id: productId } } ], _id
        }
    })

export const increaseProductQuantityAPI = (productId: number, _id: number) =>
  api
    .put(`${process.env.SERVER_DOMAIN}/api/cart/product/increase-quantity`, {
        itemDetails: [{ product: { _id: productId } } ], _id
    })

export const decreaseProductQuantityAPI = (productId: number, _id: number) =>
    api
      .put(`${process.env.SERVER_DOMAIN}/api/cart/product/decrease-quantity`, {
           itemDetails: [{ product: { _id: productId } } ], _id 
      })
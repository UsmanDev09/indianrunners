import { useEffect, useState } from "react";
import { Cart } from "@/pages/api";
import Link from "next/link";
import Image from "next/image";
import { Challenge } from "@/pages/api";

import { getCartAPI, removeChallengeFromCartAPI, removeProductFromCartAPI, increaseProductQuantityAPI, decreaseProductQuantityAPI } from '../api/cart';


const CartSideBar = ({ setShowCartSidebar, showCartSideBar } : { setShowCartSidebar : (showCartSideBar: boolean) => void, showCartSideBar: boolean }) => {
    const [cart, setCart] = useState<Cart[]>([])
    const [loading, setLoading] = useState(false)

    const fetchCart = async () => {
        getCartAPI().then(res => setCart(res.data))
    }

    const removeChallengeFromCart = async (challenge: Challenge, _id: number) => {
        setLoading(true)
        removeChallengeFromCartAPI(challenge, _id).then(() => {
            fetchCart()
            setLoading(false)
        })
    }

    const removeProductFromCart = async (productId: number, _id: number) => {
        setLoading(true)
        removeProductFromCartAPI(productId, _id).then(() => {
            fetchCart()
            setLoading(false)
          })
    }

    const increaseProductQuantity = async (productId: number, _id: number) => {
        setLoading(true)
        increaseProductQuantityAPI(productId, _id).then((res) => {
            fetchCart()   
            setLoading(false)
        })
    }

    const decreaseProductQuantity = async (productId: number, _id: number) => {
        setLoading(true)
        decreaseProductQuantityAPI(productId, _id).then((res) => {
            fetchCart()
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">

                    <div className="w-screen max-w-md">
                    <div className={`flex h-full flex-col overflow-y-scroll bg-white shadow-xl`}>
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                <div className="ml-3 flex h-7 items-center">
                                <button onClick={(e) => { e.stopPropagation(), setShowCartSidebar(false)}} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                    <span className="absolute -inset-0.5"></span>
                                    <span className="sr-only">Close panel</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {cart && cart.map((cartDetails, index) => {
                                        return cartDetails.itemType === 'challenge' ? (
                                            <li key={index} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <Image src={cartDetails.itemDetails?.[0]?.challenge?.image || '/images.jpeg'} width={100} height={100} alt="chalenge image"/>
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            {cartDetails.itemDetails && 
                                                            (<h3>
                                                                {cartDetails.itemDetails[0]?.challenge?.name! || ''}
                                                            </h3>)}
                                                            {cartDetails.itemDetails && (
                                                                <p className="ml-4">{cartDetails.itemDetails[0]?.challenge?.price}</p>
                                                            )}
                                                        </div>
                                                        {cartDetails.itemDetails && (<p className="text-left mt-1 text-sm text-gray-500">{cartDetails.itemDetails[0].challengeCategories && cartDetails.itemDetails[0].challengeCategories.length > 0 ? cartDetails.itemDetails[0].challengeCategories[0].name : ''}</p>)}
                                                    </div>
                                                    <div className="flex flex-1 justify-between text-sm">
                                                        <p className="text-gray-500"></p>

                                                        <div className="flex">
                                                            <button onClick={() => {if(cartDetails.itemDetails) removeChallengeFromCart(cartDetails.itemDetails[0]?.challenge!, cartDetails._id)} } className={`text-xl font-medium ${loading && 'text-indigo-300'} text-indigo-600 hover:text-indigo-500`}>Remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ) : (
                                            <li key={index} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <Image
                                                    src={cartDetails.itemDetails?.[0]?.product?.image || '/images.jpeg'}
                                                    width={100}
                                                    height={100}
                                                    alt="product image"
                                                />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <div>
                                                                {cartDetails.itemDetails && 
                                                                (<>
                                                                    <h3>
                                                                        {cartDetails.itemDetails[0]?.product?.name! || ''}
                                                                    </h3>
                                                                    <p className="text-left">{cartDetails.itemDetails[0]?.product?.description || ''}</p>
                                                                </>
                                                                )}
                                                            </div>
                                                            {cartDetails.itemDetails && (
                                                            <p className="ml-4">{cartDetails.itemDetails[0]?.product?.price}</p>
                                                            )}
                                                        </div>
                                                    <div className="flex flex-1 justify-between text-xl">
                                                        <div className="">
                                                            <button disabled={loading} className="text-4xl" onClick={() => increaseProductQuantity(cartDetails?.itemDetails?.[0]?.product?._id!, cartDetails._id)}>+</button>
                                                            <button disabled={loading} className="text-4xl" onClick={() => decreaseProductQuantity(cartDetails?.itemDetails?.[0]?.product?._id!, cartDetails._id)}>-</button>
                                                        </div>
                                                        <div className="">
                                                            <p className="text-right">{cartDetails?.itemDetails?.[0]?.productQuantity ? cartDetails?.itemDetails?.[0]?.productQuantity : 0}</p>
                                                            <button disabled={loading} onClick={() => {if(cartDetails.itemDetails) removeProductFromCart(cartDetails.itemDetails[0]?.product! && cartDetails.itemDetails[0]?.product._id!, cartDetails._id)} } className={`font-medium ${loading && 'text-indigo-300'}  text-indigo-600 hover:text-indigo-500`}>Remove</button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        {/* <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>$262.00</p>
                        </div> */}
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <Link href="/checkout" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                            or
                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CartSideBar;
import { Cart } from "@/pages/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Challenge } from "@/pages/api";

const CartSideBar = ({ setShowCartSidebar, showCartSideBar } : { setShowCartSidebar : (showCartSideBar: boolean) => void, showCartSideBar: boolean }) => {
    const [cart, setCart] = useState<Cart[]>([])
    const token = localStorage.getItem('token')

    const fetchCart = async () => {
        const token = localStorage.getItem('token')
        const cart  = fetch("http://localhost:5000/api/cart", {
            method: "GET",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            referrerPolicy: "no-referrer",
          })
            .then((res) => res.json())
            .then(res => setCart(res.data))
          }

    const removeChallengeFromCart = async (challenge: Challenge | undefined, _id: number) => {

        const response  = fetch("http://localhost:5000/api/cart/challenge", {
            method: "DELETE",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify({ itemDetails: [{ challenge: { _id: challenge?._id } } ], _id}),
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
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                <div className="ml-3 flex h-7 items-center">
                                <button onClick={(e) => { e.stopPropagation(), setShowCartSidebar(false)}} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                    <span className="absolute -inset-0.5"></span>
                                    <span className="sr-only">Close panel</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {cart && cart.map((cartDetails, index) => {
                                        return(
                                            <li key={index} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    {/* <Image src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" width={100} height={100} className="h-full w-full object-cover object-center" > */}
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
                                                        {cartDetails.itemDetails && (<p className="mt-1 text-sm text-gray-500">{cartDetails.itemDetails[0].challengeCategories.length > 0 ? cartDetails.itemDetails[0].challengeCategories[0].name : ''}</p>)}
                                                    </div>
                                                    <div className="flex flex-1 justify-between text-sm">
                                                        <p className="text-gray-500"></p>

                                                        <div className="flex">
                                                            <button onClick={() => {if(cartDetails.itemDetails) removeChallengeFromCart(cartDetails.itemDetails[0]?.challenge, cartDetails._id)} } className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
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
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>$262.00</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <Link href="/cart" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</Link>
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
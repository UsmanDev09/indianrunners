import { useState, useEffect } from 'react';
import Image from 'next/image';

import { Cart, ChallengeCategory } from '@/types';

export const CartSummary = ( { cartDetails } : { cartDetails: Cart[] }) => {

    return (
        <div className="bg-gray-200 w-1/2 pl-10 dark:bg-gray-700">
            {cartDetails.length > 0  ? cartDetails.map((cart, index) => {
                console.log(cart)
                
                if(cart.itemType === 'product') { 
                return(
                    <li key={index} className="flex py-6 w-[60%]">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                        src={cart?.itemDetails?.[0]?.product?.image ?? '/default-profile-image'}
                        width={100}
                        height={100}
                        alt="product image"
                    />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                        <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <div>
                                    {cart?.itemDetails && 
                                    (<>
                                        <h3>
                                            {cart?.itemDetails[0]?.product?.name! || ''}
                                        </h3>
                                        <p className="text-left">{cart.itemDetails[0]?.product?.description || ''}</p>
                                    </>
                                    )}
                                </div>
                                {cart?.itemDetails && (
                                <p className="ml-4">INR {cart.itemDetails[0]?.product?.price}</p>
                                )}
                            </div>
                        <div className="flex flex-1 justify-between text-xl">
                        
                            <div className="">
                                <p className="text-right text-sm">Quantity: {cart?.itemDetails?.[0]?.productQuantity ? cart?.itemDetails?.[0]?.productQuantity : 0}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </li> 
                )} else if(cart.itemType === 'challenge') {
                        return (
                            <div key={cart?.itemDetails?.[0]?.challenge?._id} className='w-[60%]'>
                                {cart.itemDetails?.[0].challengeCategories?.map((category: ChallengeCategory, index: number) => {
                                    return (
                                        <div key={category._id} className="flex justify-between text-base font-medium text-gray-900">
                                        <Image
                                            src={cart?.itemDetails?.[0]?.challenge?.image ?? '/default-profile-image'}
                                            width={100}
                                            height={100}
                                            alt="product image"
                                        />
                                        <div>
                                            {cart?.itemDetails && 
                                            (<>
                                                <h3>
                                                    {category?.name}
                                                </h3>
                                                <p className="text-left">{category?.description || ''}</p>
                                            </>
                                            )}
                                        </div>
                                        {cart?.itemDetails && (
                                        <p className="ml-4">INR {cart?.itemDetails?.[0]?.challenge?.price}</p>
                                        )}
                                    </div>
                                    )
                                })}
                            </div>
                        )
                }
            }) : (
                <p> No items in your cart! </p>
            )}
        </div>
    )
}

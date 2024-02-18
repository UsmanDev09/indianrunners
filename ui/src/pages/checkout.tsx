import { useState, useEffect } from "react";
import { Josefin_Sans } from "next/font/google";
import { CartSummary } from "@/components/Checkout/CartSummary";
import { ContactInformation } from "@/components/Checkout/ContactInformation";
import { Cart, User } from "@/types";

import axios from '../api/index';

const josef = Josefin_Sans({ subsets: ["latin"] });

export default function Checkout() {
  const [cartDetails, setCartDetails] = useState<Cart[]>([]);
  const [userProfile, setUserProfile] = useState<User>();
  const [shouldProcessPayment, setShouldProcessPayment] = useState<boolean>(false);

  const fetchCart = async () => {
    const { data: { data } } = await axios.get(`${process.env.SERVER_DOMAIN}/api/cart`);
    setCartDetails(data);
  } 

  const fetchProfile = async () => {
    const { data: { data } } = await axios.get(`${process.env.SERVER_DOMAIN}/api/user/profile`);
    setUserProfile(data);
  }
  
  const processPayment = async (values: any) => {
    // const { data: { data : profile} } = await axios.put('/api/user/profile', {
    //   shippingDetail: values
    // }) 
    // get order id from checkout endpoint 
    const { data: { data } } = await axios.post('/api/checkout')
    console.log(data)
    // send contact info in separate endpoint 
    // send order id in payment endpoint 
    const options = {
      key: process.env.RAZOR_PAY_API_KEY,
      amount: data.amount,
      currency: data.currency,
      name: 'user name',
      order_id: data.id,
      callback_url: `${process.env.SERVER_DOMAIN}/api/payment`,
      prefill: {
          name: 'Prasanth',
          email: 'prasanth@gmail.com'
      }
    }
  
    const raz = new (window as any).Razorpay(options);
  
    raz.open();
  }

    
  useEffect(() => {
    fetchCart();
    fetchProfile();
  }, [])
    

  return (
    <div className={`${josef.className} flex container mx-auto w-full mt-20 `}>
        <ContactInformation userProfile={userProfile} setShouldProcessPayment={setShouldProcessPayment} processPayment={processPayment}/>
        <CartSummary cartDetails={cartDetails} /> 
    </div>
  );
}
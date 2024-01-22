import { ChallengeCategory, Challenge } from "@/pages/api";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { Loader } from "./Loader";
const josef = Josefin_Sans({ subsets: ["latin"] });


const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [openPopupToSelectCategories, setOpenPopupToSelectCategories] = useState(false)
  const [cart, setCart] = useState<{ challenge: { _id: number }, challengeCategories: {_id: number }[]  }>({ challenge: { _id: 0 }, challengeCategories: [] });
  const [cartForDisplaying, setCartForDisplaying] = useState<{ itemDetails: { challenge: Challenge | null, categories: ChallengeCategory[] }}>()
  const [loading, setLoading] = useState(false);

  const handleRemoveSelectedCategory = (categoryId: number) => {
    const filteredChallengeCategories = cart?.challengeCategories.filter((category) => category._id !== categoryId )
    const filteredChallengeCategoriesForDisplaying = cartForDisplaying?.itemDetails.categories ?  cartForDisplaying?.itemDetails.categories.filter((category) => category._id !== categoryId ) : []
    if(filteredChallengeCategories) 
      setCart({
        ...cart,
        challengeCategories: filteredChallengeCategories
      })
    
    if(cartForDisplaying)
      setCartForDisplaying({
        itemDetails: {
          ...cartForDisplaying.itemDetails,
          categories: filteredChallengeCategoriesForDisplaying
        }
      })

  }
  const addCategoriesToCart = (challengeId: number, categoryId: number) => {
    if(cart?.challenge._id === challengeId) {
      setCart({
            ...cart,
            challengeCategories: [...cart.challengeCategories, { _id: categoryId }]
        })
    } else {
      setCart({
          challenge: {_id:  challengeId},
          challengeCategories: [{ _id: categoryId }] 
      })
    }
  };
  const addCategoriesToCartForDisplaying = (challenge: Challenge, category: ChallengeCategory) => {
    if(cartForDisplaying?.itemDetails.challenge === challenge) {
      setCartForDisplaying({
          itemDetails: {
            ...cartForDisplaying.itemDetails,
            categories: [...cartForDisplaying.itemDetails.categories, category ]
          }
        })
    } else {
      setCartForDisplaying({
        itemDetails: {
          challenge: challenge,
          categories: [category] 
        }
      })
    }
  };
  
  const removeFromCart = async () => {
    const token = Cookies.get("token");
    const response = await fetch(`${process.env.SERVER_DOMAIN}/api/cart/challenge`, {
      method: "PUT",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        itemType: "challenge",
        itemDetails: [cart]
      }),
    }).then((response) => response.json().then((cart) => console.log(cart)).catch((err) => console.log(err)));
  
  };

  const addToCart = async () => {
    setLoading(true)
    const token = Cookies.get("token");
    const response = await fetch(`${process.env.SERVER_DOMAIN}/api/cart/challenge`, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        itemType: "challenge",
        itemDetails: [cart]
      }),
    }).then((response) => response.json().then((cart) => {
      console.log(cart)
      setCart({ challenge: { _id: 0 }, challengeCategories: [] })
      setCartForDisplaying({itemDetails: {challenge: null, categories: [] }})
      setLoading(false)
    })).catch((err) => console.log(err));
  
  };

  return (
    <div className="w-[300px] sm:w-[360px] h-[400px] relative max-w-sm bg-white border border-gray-200 dark:bg-dark-card rounded-lg dark:border-gray-600">
      <Link href="#">
        <Image
          className="p-8 rounded-t-lg m-auto"
          width={200}
          height={200}
          src={challenge.image ?? '/defaut-profile-image.png'}
          alt="challenge image"
        />
      </Link>
      <div className="px-5 pb-5">
      <div id="crypto-modal"  aria-hidden="true" className={`absolute ${openPopupToSelectCategories ? 'flex' : 'hidden'}  mt-12 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
              <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button onClick={() => setOpenPopupToSelectCategories(!openPopupToSelectCategories)} type="button" className="absolute top-3 right-2.5 text-gray-300 bg-gray-700 dark:bg-dark-green rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="crypto-modal">
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                    
                      <div className="p-6 bg-gray-300 dark:bg-gray-700 ">
                          <ul className="my-4 space-y-3">          
                            <label htmlFor="categories" className="block mb-2 text-sm font-medium text-black dark:text-white">Categories</label>
                            {challenge.categories && challenge.categories.length > 0 && challenge.categories.map((category, index) => {
                                return (
                                <span key={index} id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                                  <button onClick={() => {addCategoriesToCart(challenge._id!, category._id!), addCategoriesToCartForDisplaying(challenge, category)}}>{category.name}</button>
                                </span>) 
                          })}
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
        <a href="#">
          <h5
            className={`${josef.className} text-xl font-semibold text-black tracking-tight text-gray-900 dark:text-white`}
          >
            {challenge.name}
          </h5>
        </a>
        <div>
        <div>
          {cartForDisplaying?.itemDetails.categories.map((category: ChallengeCategory, index: number) => { 
            return (
            <div key={index}>
              <li>{category.name}</li>
              <button onClick={() => handleRemoveSelectedCategory(category._id!) } type="button" className="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-blue-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                  <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Remove badge</span>
              </button>
            </div>
            )
          })}
          <button onClick={() => setOpenPopupToSelectCategories(!openPopupToSelectCategories)} type="button" data-modal-target="crypto-modal" data-modal-toggle="crypto-modal" className="mt-4 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
            <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
            Select Categories
          </button>
        </div> 
        </div>
        <div className="flex items-center justify-between mt-4">
          <span
            className={`${josef.className} text-3xl font-bold text-gray-900 dark:text-white`}
          >
            INR. {challenge.price}
          </span>
          <button type="submit" onClick={addToCart} className={`${josef.className} flex text-white cursor bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 py-2.5 justify-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800`}>
            <span className="mr-2"> {loading && <Loader width={4} height={4} /> } </span> 
            <p>Add to cart</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;

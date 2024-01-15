import { Challenge, Product } from "@/pages/api";
import { FormEvent, useEffect, useState } from "react";

const UpdateLandingPageSection = ({ 
        setSections,
        section,
        setOpenUpdateLandingPageSectionDrawer,
        openUpdateLandingPageSectionDrawer
    } : { 
        setSections: (sections: any[]) => void, 
        section: any, setOpenUpdateLandingPageSectionDrawer : (action: boolean) => void, 
        openUpdateLandingPageSectionDrawer: boolean 
    }) => {

    const [formData, setFormData] = useState({
        _id: section._id,
        heading: section.heading,
        products: section.products,
        challenges: section.challenges,
        type: section.type,
    })
    const [products, setProducts] = useState<Product[]>([])
    const [challenges, setChallenges] = useState<Challenge[]>([])
    const [selectedProducts, setSelectedProducts] = useState<Product[]>(formData.products)
    const [selectedChallenges, setSelectedChallenges] = useState<Challenge[]>(formData.challenges)

    const token = localStorage.getItem('token');

    const fetchProducts = async () => {
        try {
          const response = await fetch(`${process.env.SERVER_DOMAIN}/api/product`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          });
          const data = await response.json();
          setProducts(data.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
      
      const fetchChallenges = async () => {
        try {
          const response = await fetch(`${process.env.SERVER_DOMAIN}/api/challenge`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          });
          const data = await response.json();
          setChallenges(data.data);
        } catch (error) {
          console.error("Error fetching challenges:", error);
        }
      }

      useEffect(() => {
        fetchProducts();
        fetchChallenges();
      }, [])

      const handleInputChange = (e: React.ChangeEvent<EventTarget & (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) >) => {
        const { name, value } = e.target;
        
        if(name === 'products') {
          const foundProducts = products.find((product) => String(product._id) === (value));
          if(foundProducts) {
              if(!selectedProducts.some((product: Product) => product._id === foundProducts._id)) {
                  console.log('selected')
                  setSelectedProducts([...selectedProducts, foundProducts])
              }
            }
            setFormData({ ...formData, products: [...formData.products, value] });
        } else if(name === 'challenges') { 
          const foundChallenges = challenges.find((challenge) => String(challenge._id) === (value));
          if(foundChallenges) {
            if(!selectedChallenges.some((category) => category._id === foundChallenges._id)) {
                setSelectedChallenges([...selectedChallenges, foundChallenges])
            }
          }
          setFormData({ ...formData, products: [...formData.products, value] });
        } else { 
          setFormData({ ...formData, [name]: value });
        }
        
      };

      const handleRemoveSelectedProduct = (productIdToRemove: number | string | undefined) => {
        const products = selectedProducts.filter((product) => product._id !== productIdToRemove)
        const formDataProductIds = formData.products.filter((productId: number) => productId === productIdToRemove)
        setFormData({ ...formData, products: formDataProductIds });

        setSelectedProducts(products)
      }


      const handleRemoveSelectedChallenge = (challengeIdToRemove: number | string | undefined) => {
        const challenges = selectedChallenges.filter((challenge) => challenge._id !== challengeIdToRemove)
        const formDataChallengeIds = formData.challenges.filter((challengeId: string | number | undefined) => challengeId === challengeIdToRemove)
        setFormData({ ...formData, challenges: formDataChallengeIds });
  
        setSelectedChallenges(challenges)
      }
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        const cookieHeader = document.cookie;
        const tokenRegex = /token=([^;]*)/;
        let token = null;
        if (cookieHeader) {
          const tokenMatch = cookieHeader.match(tokenRegex);
          if (tokenMatch && tokenMatch.length > 1) {
            token = tokenMatch[1];
          }
        }
        
        try {
          const response = await fetch(`${process.env.SERVER_DOMAIN}/api/landingage/${section._id}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
            
            const sections  = await response.json()

          if (response.ok) {
            setOpenUpdateLandingPageSectionDrawer(false)
            setSections(sections.data[0].sections)
          } else {
            console.error('Failed to update sections');
          }
        } catch (error) {
            if(error instanceof Error){
             console.log(error.message)
            }
        }
      };

    return (
            <div id="drawer-update-product-default" className={`fixed mt-10 right-0 ${openUpdateLandingPageSectionDrawer ? 'block' : 'hidden'} z-40 w-full h-screen max-w-xs p-4 overflow-y-auto  bg-white dark:bg-gray-800`} aria-labelledby="drawer-label" aria-hidden="true">
                <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Update Product</h5>
                <button onClick={() => setOpenUpdateLandingPageSectionDrawer(!openUpdateLandingPageSectionDrawer)} type="button" data-drawer-dismiss="drawer-update-product-default" aria-controls="drawer-update-product-default" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <form action="#">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="heading" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Heading</label>
                        <input type="text" name="heading" id="heading" value={formData.heading} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Section heading" required />
                    </div>

                    <div>
                        <label htmlFor="products" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Products</label>
                        {selectedProducts && selectedProducts.map((product) => {
                          console.log(product)
                            return (<span key={product._id} id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                            {product?.name ? product?.name :  product?.product?.name}
                            <button onClick={() => handleRemoveSelectedProduct(product._id) } type="button" className="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-blue-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                                <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Remove Product</span>
                            </button>
                            </span>) 
                        })}
                        <select id="products" name="products" onChange={handleInputChange} className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected>Choose a Product</option>
                                {products && products.map((product, index) => {
                                    return (
                                      <option key={product._id} value={product._id}>
                                          <p>{product?.product?.name}</p>
                                      </option>
                                  )
                                })}
                        </select>
                    </div> 

                    <div>
                        <label htmlFor="challenges" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories</label>
                        {selectedChallenges && selectedChallenges.map((challenge) => {
                          console.log('challenge', challenge)
                            return (<span key={challenge._id} id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                            {challenge.name}
                            <button onClick={() => handleRemoveSelectedChallenge(challenge._id) } type="button" className="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-blue-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                                <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Remove Challenge</span>
                            </button>
                            </span>) 
                        })}
                        <select id="challenges" name="challenges" onChange={handleInputChange} className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected>Choose a Challenge</option>
                              {challenges && challenges.map((challenge, index) => {
                                  return (
                                    <option key={challenge._id} value={challenge._id}>{challenge.name}</option>
                                )
                              })}
                        </select>
                    </div> 

                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                        <input disabled name="description" id="description" value={formData.type} onChange={handleInputChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Type here"/>
                    </div>

                    <button type="submit" onClick={handleSubmit} className="text-white w-40 justify-center bg-gray-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Update product 
                    </button>
                </div>
            </form>
            </div>
    )
}

export default UpdateLandingPageSection;
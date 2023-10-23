import { Product } from "@/pages/api";
import { FormEvent, useState } from "react";
import Image from "next/image";

const UpdateProduct = ({ setProducts, product, setOpenUpdateProductDrawer, openUpdateProductDrawer } : { setProducts: (products: Product[]) => void, product: Product, setOpenUpdateProductDrawer : (action: boolean) => void, openUpdateProductDrawer: boolean }) => {
    console.log(product)
    const [formData, setFormData] = useState({
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        rewardPoints: 0,
        image: product.image
    })

    const handleInputChange = (e: React.ChangeEvent<EventTarget & (HTMLInputElement | HTMLTextAreaElement) >) => {
        const { name, value, type } = e.target;

      if (type === 'file') {
        const fileInput = e.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            setFormData({ ...formData, [name]: file });
        }
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };

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
          const response = await fetch('/api/updateProduct', {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
              },
            });
            
            const products  = await response.json()

          if (response.ok) {
            setOpenUpdateProductDrawer(false)
            setProducts(products)
          } else {
            console.error('Failed to create product');
          }
        } catch (error) {
            if(error instanceof Error){
             console.log(error.message)
            }
        }
      };

    return (
            <div id="drawer-update-product-default" className={`fixed mt-10 right-0 ${openUpdateProductDrawer ? 'block' : 'hidden'} z-40 w-full h-screen max-w-xs p-4 overflow-y-auto  bg-white dark:bg-gray-800`} aria-labelledby="drawer-label" aria-hidden="true">
                <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Update Product</h5>
                <button onClick={() => setOpenUpdateProductDrawer(!openUpdateProductDrawer)} type="button" data-drawer-dismiss="drawer-update-product-default" aria-controls="drawer-update-product-default" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <form action="#">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                        <Image src={formData.image} width={50} height={50} alt='' />
                        <input type="file" name="image" id="image" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                    </div>

                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                    </div>

                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number" name="price" id="price" value={formData.price} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
                    </div>

                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter description here"></textarea>
                    </div>

                    <div>
                        <label htmlFor="rewardpoints" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reward Points</label>
                        <input type="number" name="rewardPoints" value={formData.rewardPoints} onChange={handleInputChange} id="rewardpoints" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="20" required />
                    </div>

                    <button type="submit" onClick={handleSubmit} className="text-white w-40 justify-center bg-gray-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                         Update product
                    </button>
                </div>
            </form>
            </div>
    )
}

export default UpdateProduct
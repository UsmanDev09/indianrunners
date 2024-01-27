import { useState } from "react";
import Image from "next/image";

import { Challenge, Product } from "@/pages/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import { Inventory } from "@/types";
import { Loader } from "../Loader";
import UpdateLandingPageSection from './UpdateLandingPageSection';
import CreateCustomizedLandingPage from './CreateCustomizedLandingPage';
import axios from '../../api/index';
import { uploadImageToCloudinary, getPreSignedUrlFromCloudinary } from "../../helpers/helper";

const AdminPanelLandingPageCustomization = ({ landingpage } : { landingpage: any}) => {
    const [openCreateCustomizedlandingPageDrawer, setOpenCreateCustomizedLandingPageDrawer] = useState<boolean>(false);
    const [openUpdateLandingPageSectionDrawer ,setOpenUpdateLandingPageSectionDrawer] = useState(false);
    const [sectionToUpdate, setSectionToUpdate] = useState()
    const [sections, setSections] = useState(landingpage?.sections);
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(landingpage?.mainSection?.image);
    const [loading, setLoading] = useState<boolean>(false);
    
    const token = Cookies.get('token');

    const uploadLandingPageBackgroundToCloudinary = async (e: any) => {
        try {
            setLoading(true);

            const image = e.target.files[0];
            
            const url = await getPreSignedUrlFromCloudinary();

            const image_url = await uploadImageToCloudinary(image, url);
    
            await updateImageUrlInDB(image_url)
            
            setLoading(false);
        } catch(err) {   
            if(err instanceof Error) {
                setLoading(false);
                toast.error(err.message)
            }
        }
    }

    const updateImageUrlInDB = async (image_url: string) => {
        
        try {
            if(image_url) await axios.put(`${process.env.SERVER_DOMAIN}/api/landingpage`, { image: image_url }); 
            setBackgroundImageUrl(image_url)
        } catch(err) {
            toast.success('Successfully updated landing page background image');
        } 
    }

    const handleDeleteSection = (id: string) => {
        fetch(`${process.env.SERVER_DOMAIN}/api/landingpage/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            referrerPolicy: "no-referrer",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
        }).then(() => {
            fetch(`${process.env.SERVER_DOMAIN}/api/landingpage`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                referrerPolicy: "no-referrer",
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
            }).then((res) => res.json())
              .then(res => setSections(res.data.sections))
        })


    }


    return (
        <div className="w-full container mt-10">
             {/* <CreateCustomizedLandingPage
                setSections={setSections}
                setOpenCreateCustomizedLandingPageDrawer={setOpenCreateCustomizedLandingPageDrawer}
                openCreateCustomizedlandingPageDrawer={openCreateCustomizedlandingPageDrawer}
            />
            {sectionToUpdate && 
                <UpdateLandingPageSection 
                    setSections={setSections} 
                    section={sectionToUpdate} 
                    setOpenUpdateLandingPageSectionDrawer={setOpenUpdateLandingPageSectionDrawer} 
                    openUpdateLandingPageSectionDrawer={openUpdateLandingPageSectionDrawer} 
                />
            } */}
            {/* {challengeToDelete && (
                <DeleteCustomizedLandingPage
                setChallenges={setChallenges}
                challenge={challengeToDelete}
                setOpenDeleteProductDrawer={setOpenDeleteProductDrawer}
                openDeleteProductDrawer={openDeleteProductDrawer}
                />
            )} */}
            <div className="flex flex-col ">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <h3 className="font-medium">
                            Main Section:
                        </h3>
                        {loading ? <Loader /> : 
                            <div className="w-full">
                                <Image src={backgroundImageUrl ? backgroundImageUrl : '/default-profile-image.png'} width={1400} height={80} alt='product image' />
                            </div>
                        }

                        <div className="flex items-center justify-center w-full mt-8">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (1920x1080px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={uploadLandingPageBackgroundToCloudinary}/>
                            </label>
                        </div> 

                        <div className="overflow-hidden shadow mt-12">
                            <table className="min-w-full divide-y divide-gray-300 table-fixed dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Heading
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Type
                                    </th>
                                    <th>
                                        Products
                                    </th>
                                    <th>
                                        Challenges
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Actions
                                    </th>
                                    <button onClick={() => { setOpenCreateCustomizedLandingPageDrawer(!openCreateCustomizedlandingPageDrawer) }} type="button"  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 dark:text-white rounded-lg bg-gray-700 hover:bg-gray-800 focus:ring-4 mt-2 focus:ring-primary-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                        <svg className="w-4 h-2 mr-2 text-gray-900 group-hover:text-gray-900 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                        Add Section
                                    </button>
                                </tr>
                            </thead>
                                    <tbody  className="bg-white divide-y divide-gray-300 dark:bg-dark-green dark:divide-gray-700">
                                        {sections && sections.map((section: any, index: number) => {
                                            return (
                                                <>
                                                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <td key={index} className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            <div className="text-base font-semibold text-gray-900 dark:text-white">{section?.heading}</div>
                                                        </td>
                                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{section?.type}</td>
                                                        <td>    
                                                            <div className="flex flex-wrap gap-2">
                                                                {section.type === 'product' ? section.products.map((inventory: Inventory, index:number) => {
                                                                    return (
                                                                        <td key={index} >
                                                                            <div>
                                                                                <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                                                                    {inventory?.product?.name}
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                    )
                                                                }) : 
                                                                    <td className="p-4 text-xs"> None </td>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="flex flex-col">
                                                                {section.type === 'challenge' ? section.challenges.map((challenge: Challenge, index:number) => {
                                                                    return (
                                                                        <td key={index} >
                                                                            <div className="px-5 pb-5">
                                                                                <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                                                                    {challenge.name}
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                    )
                                                                }) : 
                                                                <td className="p-4 text-xs"> None </td>
                                                                }
                                                            </div>

                                                        </td>
                                                        <td className="p-4 space-x-2 whitespace-nowrap">
                                                            <button onClick={() => handleDeleteSection(section._id) } type="button" id="deleteProductButton" data-drawer-target="drawer-delete-product-default" data-drawer-show="drawer-delete-product-default" aria-controls="drawer-delete-product-default" data-drawer-placement="right" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 dark:text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                                                <svg className="w-4 h-4 mr-2 text-gray-900 hover:text-gray-900 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                                                Delete
                                                            </button>
                                                            <button onClick={() => { setOpenUpdateLandingPageSectionDrawer(!openUpdateLandingPageSectionDrawer), setSectionToUpdate(section) } } type="button" id="deleteProductButton" data-drawer-target="drawer-delete-product-default" data-drawer-show="drawer-delete-product-default" aria-controls="drawer-delete-product-default" data-drawer-placement="right" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-200 dark:text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                                                <svg className="w-4 h-4 mr-2 text-gray-900 hover:text-gray-900 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                                                Update
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody> 
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanelLandingPageCustomization;
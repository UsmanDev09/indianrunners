import { Challenge, ChallengeCategory } from "@/pages/api";
import { Datepicker } from 'flowbite-react';
import { FormEvent, useState } from "react"; 

const CreateChallenge = ({ setChallenges, categories, setOpenCreateChallengeDrawer, openCreateChallengeDrawer } : { setChallenges: (challenge: Challenge[]) => void, categories: ChallengeCategory[], setOpenCreateChallengeDrawer : (action: boolean) => void, openCreateChallengeDrawer: boolean }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        activity: '',
        knockout: false,
        knockoutType: '',
        lowerLimit: '',
        upperLimit: '',
        fixedLimit: '',
        cutOffDays: '',
        cutOffHours: '',
        startDate: new Date(),
        endDate: new Date(),
        sport: '',
        featured: false,
        verified: false,
        price: '',
        categories: [] as string[],
    })
    console.log(formData)
    const [isKnockoutToggleChecked, setIsKnockoutToggleChecked] = useState(false)
    const [isFeaturedToggleChecked, setIsFeaturedToggleChecked] = useState(false)
    const [isVerifiedToggleChecked, setIsVerifiedToggleChecked] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState<ChallengeCategory[]>([])

    const handleInputChange = (e: React.ChangeEvent<EventTarget & (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) >) => {
        const { name, value } = e.target;
        if(name === 'categories') {
            categories.forEach((category) => {
                if(category._id === value) 
                    setSelectedCategories([...selectedCategories, category])
            })
            console.log(selectedCategories)
            setFormData({ ...formData, categories: [...formData.categories, value] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleRemoveSelectedCategory = (categoryIdToRemove: ChallengeCategory) => {
        const categories = selectedCategories.filter((category) => category._id !== categoryIdToRemove)
        const formDataCategoryIds = formData.categories.filter((categoryId) => categoryId === categoryIdToRemove)
        setFormData({ ...formData, categories: formDataCategoryIds });

        setSelectedCategories(categories)
    }

    const handleStartDate = (selectedDate: Date) => {
		setFormData({...formData, startDate: selectedDate})
	}

    const handleEndDate = (selectedDate: Date) => {
		setFormData({...formData, endDate: selectedDate})
	}
    
    const handleIsKnockoutToggleChecked = () => {
        setIsKnockoutToggleChecked(!isKnockoutToggleChecked)
        setFormData({...formData, knockout: true })
    }

    const handleIsVerifiedToggleChecked = () => {
        setIsVerifiedToggleChecked(!isVerifiedToggleChecked)
        setFormData({...formData, verified: true })
    }
    
    const handleIsFeaturedToggleChecked = () => {
        setIsFeaturedToggleChecked(!isFeaturedToggleChecked)
        setFormData({...formData, featured: true })
    }

    const removeEmptyValues = (data: any) => {
        let newData: any = {};
        Object.keys(data).forEach((key) => {
          if (data[key] !== '') {
            newData[key] = data[key];
          }
        });
        return newData;
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
        const filteredFormData = removeEmptyValues(formData)
        
        try {
          const response = await fetch('/api/createChallenge', {
            method: 'POST',
            body: JSON.stringify(filteredFormData),
            headers: {
                Authorization: `${token}`,
              },
          });

          const challenges = await response.json() 
    
          if (response.ok) {
            setChallenges(challenges)
            setOpenCreateChallengeDrawer(false)
          } else {
            console.error('Failed to create challenge');
          }
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message)
                console.error('Error creating challenge:', error.message);
            }
        }
      };

    return (
        <div id="drawer-create-challenge-default" className={`fixed right-0 z-40 ${openCreateChallengeDrawer ? 'block' : 'hidden'} mt-10 w-full  h-[1200px] max-w-xs overflow-y-auto  p-4 bg-white dark:bg-gray-800`}>
            <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">New Challenge</h5>
            <button onClick={() => setOpenCreateChallengeDrawer(!openCreateChallengeDrawer)} type="button" data-drawer-dismiss="drawer-update-product-default" aria-controls="drawer-update-product-default" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close menu</span>
            </button>
            <form action="#" encType="multipart/form-data" className=" h-full mb-32">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type challenge name" required />
                    </div>

                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                        <select id="type" name="type" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option selected>Choose Type</option>
                          <option value="open">Open</option>
                          <option value="fixed">Fixed</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activity</label>
                        <select id="activity" name="activity" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option selected>Choose Type</option>
                          <option value="single">Single</option>
                          <option value="multiple">Multiple</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sport</label>
                        <select id="sport" name="sport" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected>Choose a Sport</option>
                              <option value="run">Run</option>
                              <option value="virtualRun">Virtual Run</option>
                              <option value="trailRun">Trail Run</option>
                              <option value="treadmil">Treadmil</option>
                              <option value="walk">Walk</option>
                              <option value="hike">Hike</option>
                              <option value="ride">Ride</option>
                              <option value="mountainBikeRide">Mountain Bike Ride</option>
                              <option value="gravelBikeRide">Gravel Bike Ride</option>
                              <option value="veloMobile">Velo Mobile</option>
                              <option value="virtialRide">Virtual Ride</option>
                              <option value="handcycle">Hand Cycle</option>
                              <option value="swim">Swim</option>
                              <option value="crossfit">Cross Fit</option>
                              <option value="elliptical">Elliptical</option>
                              <option value="stairStepper">Stair Stepper</option>
                              <option value="weightTraining">Weight Training</option>
                              <option value="workout">Workout</option>
                              <option value="hiit">Hiit</option>
                              <option value="pilates">Pilates</option>
                              <option value="yoga">Yoga</option>
                            </select>
                    </div> 

                    <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isKnockoutToggleChecked} onChange={handleIsKnockoutToggleChecked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Knockout</span>
                        </label>
                    </div>
                    
                    {isKnockoutToggleChecked &&  
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Knockout Type</label>
                        <select id="knockoutType" name="knockoutType" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option selected>Choose Knockout Type</option>
                          <option value="daily">Daily</option>
                          <option value="hourly">Hourly</option>
                        </select>
                    </div>} 
                    
                    {formData.type === 'open' && 
                    <div>
                        <label htmlFor="lowerLimit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lower Limit</label>
                        <input type="number" name="lowerLimit" id="lowerLimit" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
                    </div>}

                    {formData.type === 'fixed' && 
                    <div>
                        <label htmlFor="upperLimit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upper Limit</label>
                        <input type="number" name="upperLimit" id="upperLimit" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
                    </div>}

                    {formData.type === 'fixed' && 
                    <div>
                        <label htmlFor="fixedLimit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fixed Limit</label>
                        <input type="number" name="fixedLimit" id="fixedLimit" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
                    </div>}

                    {formData.knockoutType === 'daily' &&
                    <div>
                        <label htmlFor="cutoffDays" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cutoff Days</label>
                        <textarea name="cutoffDays" id="cutoffDays" onChange={handleInputChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter description here"></textarea>
                    </div>}

                    {formData.knockoutType === 'hours' &&
                    <div>
                        <label htmlFor="cutoffHours" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cutoff Hours</label>
                        <input type="cutoffHours" name="cutoffHours" onChange={handleInputChange} id="rewardpoints" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="20" required />
                    </div>}

                    <div>
                        <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories</label>
                        {selectedCategories && selectedCategories.map((category) => {
                            return (<span key={category._id} id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                            {category.name}
                            <button onClick={() => handleRemoveSelectedCategory(category._id) } type="button" className="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-blue-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                                <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Remove badge</span>
                            </button>
                            </span>) 
                        })}
                        <select id="categories" name="categories" onChange={handleInputChange} className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option selected>Choose a Category</option>
                              {categories && categories.map((category, index) => {
                                  return (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                )
                              })}
                        </select>
                    </div> 

                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="price" name="price" onChange={handleInputChange} id="rewardpoints" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="20" required />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start date</label>
                        <Datepicker onSelectedDateChanged={handleStartDate} />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End date</label>
                        <Datepicker onSelectedDateChanged={handleEndDate} />
                    </div>

                    <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" onChange={handleIsVerifiedToggleChecked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Verified</span>
                        </label>
                    </div>

                    <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" onChange={handleIsFeaturedToggleChecked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Featured</span>
                        </label>
                    </div>

                    <button type="submit" onClick={handleSubmit} className="text-white w-40 justify-center bg-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                         Add Challenge
                    </button>
                </div>
            </form>
        </div>
    )
}


export default CreateChallenge;
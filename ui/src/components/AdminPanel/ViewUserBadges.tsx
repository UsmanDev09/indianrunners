
const ViewUserBadges = ({ setOpenBadgesDrawer, openBadgesDrawer }: { setOpenBadgesDrawer: (action: boolean) => void, openBadgesDrawer: boolean}) => {
    return (
       <div className={`fixed mt-10 ${openBadgesDrawer ? 'block' : 'hidden'} right-0 m-auto z-40 top-4 h-screen w-full max-w-sm`} id="add-user-modal">
       <div className="relative w-full max-w-2xl px-4 md:h-auto">
           <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
               <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                   <h3 className="text-xl font-semibold dark:text-white">
                       Badges
                   </h3>
                   <button onClick={() => setOpenBadgesDrawer(!openBadgesDrawer)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-toggle="add-user-modal">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                   </button>
               </div>
           </div>
       </div>
       </div>
    )
   }
   
   export default ViewUserBadges
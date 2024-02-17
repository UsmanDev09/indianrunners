import SideBar from '../../components/AdminPanel/Sidebar'
import Products from '../../components/AdminPanel/Products'
import { ApiService, Product } from '../api'

const AdminPanelProducts = ({products}: {products: Product[]}) => {
    console.log(products)
    return (
        <div className="flex w-full container mx-auto">
            <SideBar />
            <Products initialProducts={products} />
        </div>
    )
}

export const getServerSideProps = (async (context: any) => {

    const cookieHeader = context.req.headers.cookie
    const tokenRegex = /token=([^;]*)/;
    let products

    if(cookieHeader) {
        const tokenMatch = cookieHeader.match(tokenRegex);

        let token = null;
        if (tokenMatch && tokenMatch.length > 1) {
            token = tokenMatch[1];
        }

    const response = await ApiService.getAllProducts({}, token)

    if(response.data)
        products = response.data
    else 
        products = []
    
    return { props: { products } };
    }

    return {props: { products } }
}) 

export default AdminPanelProducts
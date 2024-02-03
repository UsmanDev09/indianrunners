import { Cart } from "./cart"
import { ShippingDetails } from "./shippingDetail"

export interface OrderSummary {
    cart: Cart[],
    shippingDetails: ShippingDetails
} 
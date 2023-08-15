import axios from "axios";
import { createContext } from "react";



export let CartContext = createContext()

export function CartContextProvider(props) {

    let headers = {
        token: localStorage.getItem("userToken")
    }

    function addToCart(x) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: x
        }, {
            headers: headers
        }).then((response) => response).catch((error) => error)
    }

    function getLoggedCart(x) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: headers
        }).then((response) => response).catch((error) => error)
    }

    function removeProductFromCart(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers: headers
        }).then((response) => response).catch((error) => error)
    }

    function increaseProduct(productId , count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count : count
        }, {
            headers: headers
        }).then((response) => response).catch((error) => error)
    }

    return <>
        <CartContext.Provider value={{ increaseProduct, addToCart, getLoggedCart, removeProductFromCart }}>
            {props.children}
        </CartContext.Provider>
    </>
}
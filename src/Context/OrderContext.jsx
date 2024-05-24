import React, { createContext,useState} from "react";

export const OrderContext = createContext(null);

const OrderContextProvider = (props)=>{
    const [orders,setOrders] = useState([])
    const contextValue = {orders,setOrders};
    return (
        <OrderContext.Provider value={contextValue} >
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider
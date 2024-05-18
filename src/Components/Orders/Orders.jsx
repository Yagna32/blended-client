import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';

const Orders = () => {
    const { checkTokens } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    const formatDate = (dateString)=>{
        const date = new Date(dateString);
    
        // Extract date components
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        let hour = date.getHours();
        const minute = date.getMinutes();
        const amOrPm = hour >= 12 ? 'PM' : 'AM';
    
        // Convert hour from 24-hour format to 12-hour format
        hour = hour % 12 || 12;
    
        // Format the date string
        const formattedDate = `${day} ${month} ${hour}:${minute.toString().padStart(2, '0')} ${amOrPm}`;
    
        return formattedDate;
    }
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await checkTokens();
                if (result === true) {
                    const response = await fetch(`${backendURL}/orders`, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
                            'refresh-token': localStorage.getItem('refresh-token'),
                            'Content-Type': 'application/json'
                        },
                    }); 
                    if (!response.ok) {
                        throw new Error('Failed to fetch orders');
                    }
                    const orderData = await response.json();
                    console.log(orderData)
                    setOrders(orderData);
                }
            } catch (error) {
                console.error('Error while getting orders data:', error);
            }
        };
        fetchOrders();
    }, [backendURL]);

    return (
        <div className="cartitems">
            {orders && orders.map((item)=>{
                return (
                    <div key={item.order_id}>
                        <h1>{formatDate(item.createdAt)}</h1>
                        <p>Order ID : {item._id}</p>

                        {item.products.map((prods)=>{
                            return (
                                <div key={prods._id} className="cartitems-format cartitems-format-main">
                        <img src={prods.product_id.image[0]} className='carticon-product-icon'alt="" />
                        <p>{prods.product_id.name}</p>
                        <p>${prods.price}</p>
                        </div>
                            )
                        })}
                </div>)

            })}
        </div>
    );
}

export default Orders;

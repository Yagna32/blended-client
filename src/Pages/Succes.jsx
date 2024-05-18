import React, { useEffect } from 'react'
import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
const Succes = () => {
  const {clearCart,getTotalCartAmount,checkTokens} = useContext(ShopContext)
  const backendURL=process.env.REACT_APP_BACKEND_URL;
  useEffect(()=>{
    const postOrder = async()=>{
      try {
      const tokensValid = await checkTokens();
            if (tokensValid) {
              
              const order_value=getTotalCartAmount()
                const Response = await fetch(`${backendURL}/orders/newOrder`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
                        'refresh-token': `${localStorage.getItem('refresh-token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({order_value})
                });
                const data = await Response.json();
                if (data.success === true) {
                    clearCart()
                }
                else {
                  console.log("error",data.error)
                }
            }
          }
          catch(err) {
            console.log(err)
          }
    }
    postOrder()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[backendURL,checkTokens])
  return (
    <>
    <h1>Your order is successfully placed!</h1>
    <h2>Orders can be viewed <Link to='/myorders'>Here</Link></h2>
    </>
  )
}

export default Succes
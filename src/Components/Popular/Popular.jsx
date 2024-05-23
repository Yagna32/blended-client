import React,{useContext, useEffect, useState} from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { ShopProductsContext } from '../../Context/ShopProductsContext'
const Popular = () => {
    const {popularProducts,setPopularProducts} = useContext(ShopProductsContext)
    const backendURL=process.env.REACT_APP_BACKEND_URL;//process.env.REACT_APP_BACKEND_LOCAL_URL
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
      fetch(`${backendURL}/Product/popular/men`)
      .then((res)=>res.json())
      .then((data)=>{setPopularProducts(data);setLoading(false)})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[backendURL])
  return (
    <div className='popular'>
        <h1>Popular in Men</h1>
        <hr />
        {loading ? (<div>Loading... (Server starting)</div>) : (<div className="popular-item">
            {popularProducts.map((item,i)=>{
                return <Item key={i}  id={item.id} name={item.name} image={item.image[0]} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>)}
    </div>
  )
}

export default Popular
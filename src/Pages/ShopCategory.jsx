import React, { useEffect, useState } from 'react'
import './css/ShopCategory.css'
// import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
const ShopCategory = (props) => {
  // const {all_product} = useContext(ShopContext);
  const [products,setProducts] = useState([])
  const [page,setPage]=useState({"men":1,"women":1,"kid":1})
  const backendURL=process.env.REACT_APP_BACKEND_URL;
  useEffect(()=>{
    const fetchPages = ()=>{
      fetch(`${backendURL}/Product/${props.category}?page=${page[props.category]}`)
      .then((res)=>res.json())
      .then((data)=>setProducts((prev)=>[...prev,...data]))
      .catch((error)=>console.log(error))
    } 
    fetchPages();
  },[backendURL,props.category,page])

  const addPage = (category) => {
    setPage((prev)=>({...prev,[category]:prev[category]+1}))
  }

  if (products.length===0) {  
    // Handle loading state here if needed
    return <div>Loading...</div>;
  }

  return (
    <div className='shop-category'>
        <img className="shopcategory-banner"src={props.banner} alt="" />
        <div className="shopcategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 Products
          </p>
          <div className="shopcategory-sort">
            Sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
          {/* {all_product.map((item,i)=>{ */}
            {products && products.map((item,i)=>{
            if(props.category === item.category) {
              return <Item key={i} id={item.id} name={item.name} image={item.image[0]} new_price={item.new_price} old_price={item.old_price}/>
            }
            else {
              return null;
            }
          })}
        </div>
        <button className="shopcategory-loadmore"onClick={()=>addPage(props.category)}>Explore More!</button>
    </div>
  )
}

export default ShopCategory
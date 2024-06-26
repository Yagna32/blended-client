import React, { useContext, useEffect } from 'react'
// import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
import { ShopProductsContext } from '../Context/ShopProductsContext'
const Product = () => {
  const {products} = useContext(ShopProductsContext)
  const {productid} = useParams();
  console.log(productid + " id product choosed")
  const product = products.find((e)=>e.id===Number(productid))
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  
  return (
    <div className='products'>
      <Breadcrum product={product} productid={productid}/>
      <ProductDisplay product={product} productid={productid}/>
      <RelatedProducts/>
    </div>
  )
}

export default Product
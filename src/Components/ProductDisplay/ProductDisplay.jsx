import React, { useContext, useEffect, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { ShopProductsContext } from '../../Context/ShopProductsContext'


const ProductDisplay = (props) => {
    const {addToCart,checkTokens} = useContext(ShopContext);
    const {productid} = props;
    const {products,newCollection,popularProducts} = useContext(ShopProductsContext)
    console.log(productid + " id product choosed")
    const product = products.find((e)=>e.id===Number(productid)) || newCollection.find((e)=>e.id===Number(productid)) || popularProducts.find((e)=>e.id===Number(productid))
    const [mainImage,setMainImage] = useState(product.image[0])
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const [reviews,setReviews] = useState({reviews: [],totalReviews: 0, ratings: 0})
    const [showForm,setShowForm] = useState(false)
    const [formData,setFormData] = useState({product_id: productid, rating: 0, review: ''})

    const handleAddReview = async() => {
        const loggedIn = await checkTokens()
        if(loggedIn){
            setShowForm(true)
        }
        else {
            alert('please login first')
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!(formData.product_id && formData.rating && formData.review)) {
            alert("fill the remaining values")
            return;
        }
        else {
            try {
                const result = await checkTokens();
                if (result === true) {
                    const response = await fetch(`${backendURL}/reviews/addReview`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
                            'refresh-token': localStorage.getItem('refresh-token'),
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    }); 
                    if (!response.ok) {
                        throw new Error('Failed to fetch reviews');
                    }
                    const respData = await response.json();
                    console.log(respData)
                    setReviews(respData)
                    setShowForm(false)
                }
            } catch (error) {
                console.error('Error while getting reviews data:', error);
            }
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    useEffect(()=>{
        setMainImage(product.image[0])
        const fetchReviews = async () => {
            try {
                    const response = await fetch(`${backendURL}/reviews/getReviews?product=${productid}`, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
                            'refresh-token': localStorage.getItem('refresh-token'),
                            'Content-Type': 'application/json'
                        },
                    }); 
                    if (!response.ok) {
                        throw new Error('Failed to fetch reviews');
                    }
                    const contentLength = response.headers.get('Content-Length');
            if (contentLength && parseInt(contentLength) === 0) {
                return;
            }
                    const respData = await response.json();
                    setReviews(respData)
                
            } catch (error) {
                console.error('Error while getting reviews data:', error);
            }
        };
        fetchReviews();
    },[backendURL, checkTokens, product, productid])
    function changeImageHandler(e) {
        setMainImage(e.target.src);
    }
  return (
    <>
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                {product.image.map((item)=><img key={item} onClick={changeImageHandler} src={item} alt='product images'/>)}
                {/* <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" /> */}
            </div>
            <div className="productdisplay-img">
                <img src={mainImage} alt="" className="productdisplay-main-img" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>{reviews.ratings}</p>
            </div>
            <div className="product-display-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                {product.description}
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
                <button className='productdisplay-addtocart' onClick={()=>{addToCart(product.id,product.new_price,mainImage,product.name)}}>ADD TO CART</button>
                <button className='productdisplay-addreview' onClick={()=>handleAddReview()}>ADD REVIEW</button>
                <p className='productdisplay-right-category'><span>Category : </span>MEN, T-shirt, Shirts</p>
                <p className='productdisplay-right-category'><span>Tags : </span>Mordern, Latest</p>
            </div>
        </div>
        </div>
        
        {showForm ? (
        <div className='descriptionbox'>
            <div className="descriptionbox-nav">
                <div className="descriptionbox-nav-box fade">
                    Add Review
                </div>
            </div>
        <div className="descriptionbox-description">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Rating:
                    <input
                        type='number'
                        name='rating'
                        value={formData.rating}
                        onChange={handleInputChange}
                        required
                    />
                    </label>
                </div>
                <div>
                    <label>
                        Review:
                    <textarea
                        name='review'
                        value={formData.review}
                        onChange={handleInputChange}
                        required
                    />
                    </label>
                </div>
                <button onClick={()=>{setFormData({product_id: productid, rating: 0, review: ''});setShowForm(false)}}>cancel</button>
                <button type='submit'>Submit</button>
            </form>
        </div>
        </div>)
        :(
        <div className='descriptionbox'>
            <div className="descriptionbox-nav">
                <div className="descriptionbox-nav-box fade">
                    Reviews ({reviews.totalReviews})
                </div>
            </div>
            <div className="descriptionbox-description">
                {reviews.reviews && reviews.reviews.map((rev)=>(<div key={rev.createdAt}>
                    <div>{rev.user_id}</div>
                    <div>{rev.rating}</div>
                    <div>{rev.review}</div>
                </div>))}
            </div>
        </div>)}
    </>
  )
}

export default ProductDisplay
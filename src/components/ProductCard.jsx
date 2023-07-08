import React from 'react'
import { CartState } from '../context/context'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ productInfo }) => {
    const { name, imageURL, price, gender, quantity, color, id } = productInfo
    const { state: { cart }, dispatch } = CartState()
    const navigate = useNavigate()

    const handleAddToCart = (product) => {
        dispatch({
            type: "addToCart",
            payload: product
        })
    }
    return (
        <div className='product-card'>
            <div className='product-image'>
                <img src={imageURL} alt={name} className='hide-bg' />
            </div>
            <div className='product-details'>{name} for {gender}
                <span>{color}</span>
            </div>
            <div className='card-footer'>
                <div className='price'>${price}
                    {
                        !quantity ?
                            <span className='out'>Out of Stock</span> :
                            <span>Only {quantity} in stock</span>
                    }
                </div>
                <div>
                    {
                        cart.some((p) => p.id === id) ? (
                            <button className="checkout"  onClick={() => navigate('/cart')}>Checkout</button>
                        ) : <button disabled={!quantity ? true : false} onClick={() => handleAddToCart(productInfo)}>Add to Cart</button>
                    }
                </div>


            </div>
        </div>
    )
}

export default ProductCard
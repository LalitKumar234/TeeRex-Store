import React, { useState, useEffect } from 'react'
import { CartState } from '../context/context';
import EmptyCart from '../components/EmptyCart';


const Cart = () => {
  const { state: { cart }, dispatch } = CartState()
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    setTotalPrice(cart.reduce((acc, curr) =>
      acc + curr.price * curr.qty, 0))
  }, [cart])

  if (!cart.length)
  return <div className='no-item'>
    <EmptyCart/>
    <h3>You have no item in the Cart</h3>
  </div>

  return (
    <div className='cart-container'>
      <h3>Shopping Cart</h3>
      <ul className='cart-items'>
        {
          cart.length && cart.map((item) => {
            return <li className='cart-item' key={item.id}>
              <img src={item.imageURL} alt={item.name} />
              <div className='product-details-cart'>
                <div className="name">{item.name}</div>
                <div className="price">${item.price}</div>
              </div>
              <div className="quantity-left">
                 {(item.quantity)-(item.qty) === 0 ? <span className='out'>Out of Stock</span> : `only ${item.quantity-item.qty} more left`} 
              </div>
              <div className='quantity'>
                <button
                  onClick={() => {
                    dispatch({
                      type: "increment",
                      payload: item
                    })
                  }}
                  className='inc-dec-btn'>+</button>
                <span>{item.qty}</span>
                <button
                  onClick={() => {
                    dispatch({
                      type: "decrement",
                      payload: item
                    })
                  }} className='inc-dec-btn'>-</button>
              </div>
              <button
                onClick={() => {
                  dispatch({
                    type: "removeFromCart",
                    payload: item
                  })
                }}
                className='delete-btn'>Delete</button>
            </li>
          })
        }
      </ul>
      <div className='total-price'>
        <h3>Total: {totalPrice}</h3>
        </div>
      
    </div>
  )
}

export default Cart
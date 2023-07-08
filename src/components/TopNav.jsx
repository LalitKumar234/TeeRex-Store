import React from 'react'
import './style.css'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CartState } from '../context/context';
import { BsGithub } from 'react-icons/bs';

const TopNav = () => {
    const { state: { cart } } = CartState()

    return (
        <nav className='nav-container'>
            <div className='nav-inner'>
                <div className='flex-cnt'>
                    <Link to="/" className='link'>
                        <div className="logo">TeeRex <span>Store</span></div>
                    </Link>
                    <a href="https://github.com/LalitKumar234/TeeRex-Store" target='_blank' className='github link'>
                        <BsGithub size={25} />
                    </a>

                </div>
                <ul className='menus'>
                    <Link to="/" className='link'>
                        <li>Products</li>
                    </Link>
                    <Link to="/cart" className='link'>
                        <li className='cart-icon'>
                            {
                                cart.length ? <div className='cart-count'>{cart.length}</div> : null
                            }
                            <AiOutlineShoppingCart />
                        </li>
                    </Link>
                </ul>
            </div>
        </nav>
    )
}

export default TopNav
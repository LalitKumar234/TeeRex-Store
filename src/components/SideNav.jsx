import React from 'react'
import './style.css'
import { colors, genders, prices, types } from './data/sidenavdata'

const SideNav = ({ handleColors, handleGender, handleType, handlePrice, showSidebar }) => {

  return (
    <div className='side-nav-container' style={{display: showSidebar && 'block'}}>
      <div className='side-nav-inner'>
        <h3>Color</h3>
        <ul className='filter'>
          {
            colors.map((color) => {
              return <li key={color.id}>
                <label className="checkBox-container">{color.label}
                  <input type="checkbox" value={color.label}
                    onChange={handleColors} />
                  <span className="checkmark"></span>
                </label>
              </li>
            })
          }
        </ul>
        <h3>Gender</h3>
        <ul className='filter'>
          {
            genders.map((gender) => {
              return <li key={gender.id}>
                <label className="checkBox-container">{gender.label}
                  <input type="checkbox" value={gender.label} onChange={handleGender} />
                  <span className="checkmark"></span>
                </label>
              </li>
            })
          }
        </ul>
        <h3>Price</h3>
        <ul className='filter'>
          {
            prices.map((price) => {
              return <li key={price.id}>
                <label className="checkBox-container">{price.label}
                  <input type="checkbox"
                    value={JSON.stringify(price)}
                    onChange={handlePrice}
                  />
                  <span className="checkmark"></span>
                </label>
              </li>
            })
          }
        </ul>
        <h3>Type</h3>
        <ul className='filter'>
          {
            types.map((type) => {
              return <li key={type.id}>
                <label className="checkBox-container">{type.label}
                  <input type="checkbox" value={type.label} onChange={handleType} />
                  <span className="checkmark"></span>
                </label>
              </li>
            })
          }
        </ul>

      </div>
    </div>
  )
}

export default SideNav
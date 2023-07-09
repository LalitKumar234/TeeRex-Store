import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { axiosGet } from '../utils/AxiosGet'
import SideNav from '../components/SideNav'
import { RiFilter2Line, RiSearch2Line } from 'react-icons/ri';


const Products = () => {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [filterState, setFilterState] = useState({
    colors: [],
    gender: [],
    type: [],
    priceRange: [],
    searchInput: ''
  })


  const handleColors = (e) => {
    let newItems = [...filterState.colors]
    if (e.target.checked) newItems = [...filterState.colors, e.target.value]
    else newItems.splice(filterState.colors.indexOf(e.target.value), 1);
    setFilterState({ ...filterState, colors: newItems })

  }

  const handleGender = (e) => {
    let newItems = [...filterState.gender]
    if (e.target.checked) newItems = [...filterState.gender, e.target.value]
    else newItems.splice(filterState.gender.indexOf(e.target.value), 1);
    setFilterState({ ...filterState, gender: newItems })
  }
  const handleType = (e) => {
    let newItems = [...filterState.type]
    if (e.target.checked) newItems = [...filterState.type, e.target.value]
    else newItems.splice(filterState.type.indexOf(e.target.value), 1);
    setFilterState({ ...filterState, type: newItems })
  }

  const handlePrice = (e) => {
    let newItems = [...filterState.priceRange]
    if (e.target.checked) newItems = [...filterState.priceRange, e.target.value]
    else newItems.splice(filterState.priceRange.indexOf(e.target.value), 1)
    setFilterState({ ...filterState, priceRange: newItems })
  }
  const filteredItems = () => {
    let filteredItems = products;
    const searchItem = filterState.searchInput.toLowerCase();
    const searchAttributes = ['color', 'gender', 'name', 'price'];
    if (filterState.searchInput) {
      filteredItems = filteredItems.filter((item) =>
        searchAttributes.some((key) => {
          const property = item[key];
          if (typeof property === 'string') {
            return property.toLowerCase().includes(searchItem);
          } else if (typeof property === 'number') {
            return property.toString().toLowerCase().includes(searchItem);
          }
          return false;
        })
      );
    }

    if (filterState.colors.length) {
      filteredItems = filteredItems.filter(item =>
        filterState.colors.includes(item.color.toLowerCase()))
    }
    if (filterState.gender.length) {
      filteredItems = filteredItems.filter(item =>
        filterState.gender.includes(item.gender.toLowerCase()))
    }
    if (filterState.type.length) {
      filteredItems = filteredItems.filter(item =>
        filterState.type.includes(item.type.toLowerCase()))
    }
    if (filterState.priceRange.length) {
      filteredItems = filteredItems.filter((item) => {
        const itemPrice = item.price;
        return filterState.priceRange.some(
          (range) => {
            const { minValue, maxValue } = JSON.parse(range)
            return itemPrice >= minValue && itemPrice <= maxValue
          }
        );
      });
    }
    setFilter(filteredItems)
  }


  useEffect(() => {
    filteredItems()
    console.log(filter)
  }, [filterState]);

  useEffect(() => {
    axiosGet()
      .then((response) => {
        setProducts(response.data)
        setFilter(response.data)

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>

      <SideNav
        showSidebar={showSidebar}
        handleColors={handleColors}
        handleGender={handleGender}
        handleType={handleType}
        handlePrice={handlePrice}
      />


      <div className='home-container'>
        <div className='search-bar-container'>
          <input
            type="text"
            placeholder='Search products based on color, type, price...'
            onChange={(e) =>
              setFilterState({ ...filterState, searchInput: e.target.value })}
            value={filterState.searchInput}
          />
          <div className='search-icon'>
            <RiSearch2Line />
          </div>
          <div className='filter-icon'>
            <RiFilter2Line onClick={() => setShowSidebar(!showSidebar)} />
          </div>
        </div>
        <div className='home-inner'>
          {
            filter && filter.map((product) => {
              return (<ProductCard
                productInfo={product}
                key={product.id}
              />)
            })
          }
        </div>
      </div>
    </>
  )
}

export default Products
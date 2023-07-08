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
    let updatedList = [...filterState.colors]
    if (e.target.checked) updatedList = [...filterState.colors, e.target.value]
    else updatedList.splice(filterState.colors.indexOf(e.target.value), 1);
    setFilterState({ ...filterState, colors: updatedList })

  }

  const handleGender = (e) => {
    let updatedList = [...filterState.gender]
    if (e.target.checked) updatedList = [...filterState.gender, e.target.value]
    else updatedList.splice(filterState.gender.indexOf(e.target.value), 1);
    setFilterState({ ...filterState, gender: updatedList })
  }
  const handleType = (e) => {
    let updatedList = [...filterState.type]
    if (e.target.checked) updatedList = [...filterState.type, e.target.value]
    else updatedList.splice(filterState.type.indexOf(e.target.value), 1);
    setFilterState({ ...filterState, type: updatedList })
  }

  const handlePrice = (e) => {
    let updatedList = [...filterState.priceRange]
    if (e.target.checked) updatedList = [...filterState.priceRange, e.target.value]
    else updatedList.splice(filterState.priceRange.indexOf(e.target.value), 1)
    setFilterState({ ...filterState, priceRange: updatedList })
  }
  const filteredItems = () => {
    let updatedItems = products;

    if (filterState.searchInput) {
      updatedItems = updatedItems.filter(item => {
        const searchItem = filterState.searchInput.toLowerCase()

        return item.name.toLowerCase().includes(searchItem) ||
          item.color.toLowerCase().includes(searchItem) ||
          item.type.toLowerCase().includes(searchItem)
      }
      )
    }
    if (filterState.colors.length) {
      updatedItems = updatedItems.filter(item =>
        filterState.colors.includes(item.color.toLowerCase()))
    }
    if (filterState.gender.length) {
      updatedItems = updatedItems.filter(item =>
        filterState.gender.includes(item.gender.toLowerCase()))
    }
    if (filterState.type.length) {
      updatedItems = updatedItems.filter(item =>
        filterState.type.includes(item.type.toLowerCase()))
    }
    if (filterState.priceRange.length) {
      updatedItems = updatedItems.filter((item) => {
        const itemPrice = item.price;
        return filterState.priceRange.some(
          (range) => {
            const { minValue, maxValue } = JSON.parse(range)
            return itemPrice >= minValue && itemPrice <= maxValue
          }
        );
      });
    }
    setFilter(updatedItems)
  }


  useEffect(() => {
    filteredItems()
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
            placeholder='Search for Products...'
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
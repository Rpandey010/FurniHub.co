import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
// import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";

const ShopCategory = (props) => {

  const [allproducts, setAllProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order is ascending

  const fetchInfo = () => { 
    fetch('http://localhost:4000/products/allproducts') 
            .then((res) => res.json()) 
            .then((data) => setAllProducts(data))
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  }

  const sortedProducts = [...allproducts].filter(item => props.category === item.category);

  // Sort products based on price
  if (sortOrder === 'asc') {
    sortedProducts.sort((a, b) => a.new_price - b.new_price);
  } else {
    sortedProducts.sort((a, b) => b.new_price - a.new_price);
  }

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p><span>Showing 1 - {sortedProducts.length}</span> out of {allproducts.length} Products</p>
        <div className="shopcategory-sort">
          Sort by 
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.map((item, i) => (
          <Item 
            id={item.id} 
            key={i} 
            name={item.name} 
            image={item.image}  
            new_price={item.new_price} 
            old_price={item.old_price}
          />
        ))}
      </div>
      <div className="shopcategory-loadmore">
        <Link to='/' style={{ textDecoration: 'none' }}>Explore More</Link>
      </div>
    </div>
  );
};

export default ShopCategory;

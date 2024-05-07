import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        {/* <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div> */}
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">₹{product.old_price}</div>
          <div className="productdisplay-right-price-new">₹{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          <h1>Description:</h1>
          {product.description}
        </div>
        <div className="productdisplay-right-dimensions">
          <h1>Dimensions</h1>
          <p>Height: {product.height} inches</p>
          <p>Width: {product.width} inches</p>
          {/* <p>Length: {product.length} inches</p> */}
        </div>
        <button onClick={() => { addToCart(product.id); }}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category:</span> {product.category}</p>
        <p className="productdisplay-right-category"><span>Tags:</span> Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
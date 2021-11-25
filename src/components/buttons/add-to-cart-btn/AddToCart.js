import React from "react";
import { Link } from "react-router-dom";
import "./addtocart.css";

class AddToCart extends React.Component {
  render() {
    console.log(this.props);
    return (
      <button type="button" className="add-to-cart" {...this.props}>
        add to cart
      </button>
    );
  }
}

export default AddToCart;

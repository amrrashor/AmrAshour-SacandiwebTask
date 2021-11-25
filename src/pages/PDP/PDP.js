import React from "react";

import { withRouter } from "react-router-dom";

import { getProduct } from "../../apollo/queries/get-product";
import client from "../../apollo/client";

import AddToCart from "../../components/buttons/add-to-cart-btn/AddToCart";

import "./pdp.css";

class PDP extends React.Component {
  state = {
    isLoading: false,
    product: {},
    hasError: false,
  };
  componentDidMount() {
    this.fetchProduct(this.props.match.params.id);
  }

  async fetchProduct(product_id) {
    this.setState({ isLoading: true });
    try {
      const { data, errors } = await client.query({
        query: getProduct,
        variables: {
          id: product_id,
        },
      });
      if (data.product === null) {
        this.setState({
          product: {},
          hasError: true,
          isLoading: false,
        });
      } else {
        this.setState({
          product: data.product,
          hasError: false,
          isLoading: false,
        });
      }
    } catch (e) {
      this.setState({ hasError: true, isLoading: false });
    }
  }
  render() {
    console.log(this.state.product);
    return !this.state.hasError && !this.state.loading ? (
      <div className="container">
        <div className="desc_wrapper">
          <div className="first_section">
            {this.state.product.gallery &&
              this.state.product.gallery
                .slice(1, this.state.product.gallery.length)
                .map((item) => <img src={item} />)}
          </div>
          <div className="second_section">
            <img
              src={this.state.product.gallery && this.state.product.gallery[0]}
            />
          </div>
          <div className="third_section">
            <p className="desc_name">{this.state.product.name}</p>
            <p className="price">
              {this.state.product.prices?.map((price) => {
                if (price.currency == this.props.currentCurrency) {
                  return (
                    <>
                      <p>price:</p>
                      <span> {price.amount} </span>
                      <span> {price.currency}</span>
                    </>
                  );
                }
              })}
            </p>
            <AddToCart
              onClick={() => {
                this.props.addToCart({
                  id: this.state.product?.id,
                  img: this.state.product?.gallery[0],
                  name: this.state.product?.name,
                  price: this.state.product?.prices,
                  count: 1,
                });
              }}
            />
            <div
              className="desc_paragragh"
              dangerouslySetInnerHTML={{
                __html: this.state.product.description,
              }}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="not_found">Product Not Found</div>
    );
  }
}

export default withRouter(PDP);

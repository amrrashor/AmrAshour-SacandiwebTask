import React from "react";
import { BsCart2 } from "react-icons/bs";
import "./minicart.css";
import ViewBagBtn from "../buttons/view-bag-btn/ViewBagBtn";
import CheckOutBtn from "../buttons/checkout-btn/CheckOutBtn";
import Counter from "../counter/Counter";

class MiniCart extends React.Component {
  state = {
    showCart: false,
    totalPrice: 0,
  };

  toggleCart = () => {
    this.setState({
      showCart: !this.state.showCart,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentCurrency != this.props.currentCurrency) {
      let total = 0;
      this.props.cart.map((item) => {
        item.price.map((cprice) => {
          if (cprice.currency == this.props.currentCurrency) {
            total = total + cprice.amount;
          }
        });
      });
      this.setState({ totalPrice: total });
    }
    if (prevProps.cart != this.props.cart) {
      let total = 0;
      this.props.cart.map((item) => {
        item.price.map((cprice) => {
          if (cprice.currency == this.props.currentCurrency) {
            total = total + cprice.amount;
          }
        });
      });
      this.setState({ totalPrice: total });
    }
  }

  render() {
    console.log(this.props);
    return (
      <>
        <BsCart2 className="mini_cart_icon" onClick={this.toggleCart} />{" "}
        <div
          className="drop_down"
          style={{ display: `${this.state.showCart ? "block" : "none"}` }}
        >
          <div className="dropdown_overlay" onClick={this.toggleCart}></div>

          <div className="dropdown_content">
            <div className="item_content">
              <h3>
                my bag, <span>{this.props.cart.length} items</span>
              </h3>
              {this.props.cart.slice(0, 2).map((item, index) => {
                return (
                  <div className="product_details">
                    <div className="product_detail_1">
                      <p>{item.name}</p>
                      <p>
                        {item.price.map((cprice) => {
                          if (cprice.currency == this.props.currentCurrency) {
                            return (
                              <>
                                <span>{cprice.amount} </span>
                                <span> {cprice.currency}</span>
                              </>
                            );
                          }
                        })}
                      </p>
                      <div className="size">
                        <p className="single_size">S</p>
                        <p className="single_size">M</p>
                      </div>
                    </div>

                    <div className="product_img">
                      <Counter />
                      <img src={item.img} alt={item.name} />
                    </div>
                  </div>
                );
              })}

              <div className="money_counter">
                <p>total</p>
                <p>
                  {parseFloat(this.state.totalPrice).toFixed(2)}
                  {this.props.currentCurrency}
                </p>
              </div>
            </div>
            <div className="btn_wrapper">
              <ViewBagBtn />
              <CheckOutBtn />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MiniCart;

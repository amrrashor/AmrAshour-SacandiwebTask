import React from "react";
import "./cart.css";
import Counter from "../../components/counter/Counter";


class Cart extends React.Component {
  state = {
    totalPrice: 0,
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
    return (
      <div className="container cart">
        <h2 className="cart_title">Cart</h2>
        <div className="item_content">
          {this.props.cart.map((item, index) => {
            return (
              <div className="product_details">
                <div className="product_detail_1">
                  <p className="product_name">{item.name}</p>
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
        </div>
      </div>
    );
  }
}

export default Cart;

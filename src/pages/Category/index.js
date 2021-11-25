import React from "react";

//router
import { Link, withRouter } from "react-router-dom";

//graphQL
import client from "../../apollo/client";
import { getCategoryByName } from "../../apollo/queries/get-category";
import { getCategories } from "../../apollo/queries/get-categories";

//react icons
import { BsCart2, BsCheckCircleFill } from "react-icons/bs";

//style
import "./categoryIndex.css";
import Cart from "../cart/Cart";

class Category extends React.Component {
  state = {
    products: [],
    prices: [],
    loading: true,
    category: "",
    categories: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.categories !== this.state.categories ||
      prevProps.match.params.id !== this.props.match.params.id
    ) {
      if (
        this.state.categories.some((e) => e.name === this.props.match.params.id)
      ) {
        this.setState({ category: this.props.match.params.id });
      } else {
        this.props.history.push(`/${this.state.categories[0]?.name}`);
      }
    }
    if (prevState.category !== this.state.category) {
      this.fetchCategory(this.state.category);
    }
  }
  async fetchCategories() {
    this.setState({ isLoading: true });
    const { data, errors } = await client.query({
      query: getCategories,
    });
    this.setState({ categories: data.categories });
  }

  async fetchCategory(category) {
    this.setState({ loading: true });
    const { data, errors } = await client.query({
      query: getCategoryByName,
      variables: {
        id: category,
      },
    });

    this.setState({ products: data.category.products, loading: false });
  }

  render() {
    console.log(this.props);

    return (
      <div className="container">
        <div className="items_wrapper">
          {!this.state.loading && (
            <>
              {this.state.products.map((item) => (
                <div className="single_product">
                  <div className="img_section">
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      key={item.name}
                    >
                      <img src={item.gallery[0]} alt="" />
                    </Link>
                    {this.props.cart.find((e) => e.id === item.id) ? (
                      <button className="add-to-cart-btn">
                        <BsCheckCircleFill className="icon" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="add-to-cart-btn"
                        onClick={() => {
                          this.props.addToCart({
                            id: item.id,
                            img: item.gallery[0],
                            name: item.name,
                            price: item.prices,
                            count: 1,
                          });
                        }}
                      >
                        <BsCart2 className="icon" />
                      </button>
                    )}
                  </div>
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    key={item.name}
                  >
                    <p className="item_name">{item.name}</p>
                    <p className="item_price">
                      {item.prices.map((price) => {
                        if (price.currency == this.props.currentCurrency) {
                          return (
                            <>
                              <span>{price.amount} </span>
                              <span> {price.currency}</span>
                            </>
                          );
                        }
                      })}
                    </p>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Category);

import React, { Component } from "react";

//style
import "./App.css";

//apollo and quries
import { ApolloProvider, from } from "@apollo/client";
import client from "./apollo/client";
import {
  getCategoriesName,
  getCategories,
} from "./apollo/queries/get-categories";
import { getCategoryByName } from "./apollo/queries/get-category";
import { getCurrencies } from "./apollo/queries/get-currencies";
import { getProduct } from "./apollo/queries/get-product";

//routing

import { Route, Switch, withRouter, Redirect } from "react-router-dom";

//components
import Category from "./pages/Category";
import Cart from "./pages/cart/Cart";
import PDP from "./pages/PDP/PDP";
import Navbar from "./components/navbar/Navbar";

class App extends Component {
  state = {
    categories: [],
    categoriesNames: [],
    isLoading: false,
    category: {},
    currencies: [],
    currentCurrency: "",
    product: {},
    cart: [],
  };

  componentDidMount() {
    this.fetchCategories();
    this.fetchCategoriesName();
    this.fetchCategory();
    this.fetchCurrencies();
    this.fetchProduct();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currencies !== this.state.currencies) {
      this.setState({ currentCurrency: this.state.currencies[0] });
    }
  }
  changeCurrency = (currency) => {
    this.setState({ currentCurrency: currency });
  };

  addToCart = (item) => {
    this.setState({ cart: [...this.state.cart, item] });
  };

  async fetchCategories() {
    this.setState({ isLoading: true });
    const { data, errors } = await client.query({
      query: getCategories,
    });
    this.setState({ categories: data.categories, isLoading: false });
  }

  async fetchCategoriesName() {
    this.setState({ isLoading: true });
    const { data, errors } = await client.query({
      query: getCategoriesName,
    });
    this.setState({ categoriesNames: data.categories, isLoading: false });
  }

  async fetchCategory() {
    this.setState({ isLoading: true });
    const { data, errors } = await client.query({
      query: getCategoryByName,
      variables: {
        id: "clothes",
      },
    });
    this.setState({ category: data.category, isLoading: false });
  }

  async fetchCurrencies() {
    this.setState({ isLoading: true });
    const { data, errors } = await client.query({
      query: getCurrencies,
    });
    this.setState({ currencies: data.currencies, isLoading: false });
  }

  async fetchProduct() {
    this.setState({ isLoading: true });
    const { data, errors } = await client.query({
      query: getProduct,
      variables: {
        id: "huarache-x-stussy-le",
      },
    });
    this.setState({ product: data.product, isLoading: false });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Navbar
          currencies={this.state.currencies}
          categories={this.state.categories}
          changeCurrency={this.changeCurrency}
          currentCurrency={this.state.currentCurrency}
          cart={this.state.cart}
          addToCart={this.addToCart}
        />
        <Switch>
          <Route exact path="/">
            {this.state.categories.length > 0 && (
              <Redirect to={`/category/${this.state.categories[0].name}`} />
            )}
          </Route>
          <Route path="/category/:id">
            <Category
              currentCurrency={this.state.currentCurrency}
              addToCart={this.addToCart}
              cart={this.state.cart}
            />
          </Route>
          <Route path="/product/:id">
            <PDP
              currentCurrency={this.state.currentCurrency}
              addToCart={this.addToCart}
              cart={this.state.cart}
            />
          </Route>
          <Route
            exact
            path="/cart"
            currentCurrency={this.state.currentCurrency}
          >
            <Cart
              currentCurrency={this.state.currentCurrency}
              cart={this.state.cart}
            />
          </Route>
        </Switch>
      </ApolloProvider>
    );
  }
}

export default withRouter(App);

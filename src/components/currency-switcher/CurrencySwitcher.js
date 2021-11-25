import React from "react";
import "./currencyswitcher.css";
import {
  BsCurrencyDollar,
  BsCurrencyEuro,
  BsCurrencyYen,
  BsChevronDown,
} from "react-icons/bs";

class CurrencySwitcher extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    name: "usd",
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
    this.props.changeCurrency(event.target.value);
  };

  render() {
    return (
      <div className="currency_switcher">
        <select
          className="currency_options"
          value={this.state.value}
          onChange={this.handleChange}
        >
          {this.props.currencies?.map((item, index) => (
            <option className="single_currency" value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default CurrencySwitcher;

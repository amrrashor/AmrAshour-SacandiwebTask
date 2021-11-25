import React from "react";
import { Link } from "react-router-dom";
import './viewbagbtn.css';

class ViewBagBtn extends React.Component {
    render() {
        return (
            <Link className="view-bag" to="/cart">
                view bag
            </Link>
        )
    }
}

export default ViewBagBtn
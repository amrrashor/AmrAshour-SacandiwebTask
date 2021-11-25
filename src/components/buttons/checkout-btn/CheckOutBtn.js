import React from "react";
import { Link } from "react-router-dom";
import './checkoutbtn.css';

class CheckOutBtn extends React.Component {
    render() {
        return (
            <Link to="/cart" className='check-out'>
                check out
            </Link>
        )
    }
}

export default CheckOutBtn;
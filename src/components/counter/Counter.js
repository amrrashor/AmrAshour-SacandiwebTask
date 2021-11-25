import React from "react";
import './counter.css';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';


class Counter extends React.Component {
    constructor(){
        super();
        this.state= {
            count:1
        }
    }

    increment= () => {
        this.setState({
            count:this.state.count + 1
        })
    }

    decrement(){
        if( this.state.count === 1 ){
            this.setState({
                count:1
            });
        }else {
            this.setState({
                count:this.state.count - 1
            });
        }
    }


    render() {
        let { count } = this.state;

        return (
            <div className="count-container">
                <div className='btn' onClick={this.increment.bind(this)}>
                    <AiOutlinePlus />
                </div>
                <div className='count'>{ count }</div>
                <div className='btn' onClick={this.decrement.bind(this)}>
                    <AiOutlineMinus />
                </div>
            </div>
        )
    }
}

export default Counter
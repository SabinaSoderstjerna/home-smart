import React from 'react';
import Slider from 'react-rangeslider';
import {throttle, debounce} from 'throttle-debounce';
import 'react-rangeslider/lib/index.css';

class HorizontalSlider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: 10
        };
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        if (this.props.lightState != undefined) {
            this.setState({ value: this.props.lightState.state.bri });
        };
    }

    handleChange(value) {
        /* Change bri settings on lights */
        debounce(10, fetch('/api/lights/' + this.props.lightNr + '/brightness', {
            method: 'PUT',
            body: JSON.stringify({ brightness: value }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(err => err));

        this.setState({
            value: value
        });
    };

    render() {
        const { value } = this.state
        return (
            <div className='slider'>
                <Slider
                    min={0}
                    max={255}
                    value={value}
                    onChange={this.handleChange}
                />
                <div className='value'>Brightness: {value}</div>
            </div>
        )
    }
}

export default HorizontalSlider
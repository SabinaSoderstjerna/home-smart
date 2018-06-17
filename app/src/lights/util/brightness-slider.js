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

    handleChangeStart() {
        console.log('Change event started');
    };

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

    handleChangeComplete() {
        console.log('Change event completed');
    };

    render() {
        const { value } = this.state
        console.log(value)
        return (
            <div className='slider'>
                <Slider
                    min={0}
                    max={255}
                    value={value}
                    onChangeStart={this.handleChangeStart}
                    onChange={this.handleChange}
                    onChangeComplete={this.handleChangeComplete}
                />
                <div className='value'>{value}</div>
            </div>
        )
    }
}

export default HorizontalSlider
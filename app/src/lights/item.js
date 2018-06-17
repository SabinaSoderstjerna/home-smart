import React from 'react';

import HorizontalSlider from './util/brightness-slider.js'

class LightState extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null }
        this.handleClick = this.handleClick.bind(this);
    };

    componentDidMount() {
        fetch('/api/lights/' + this.props.lightNr)
            .then(results => {
                return results.json()
            }).then((result) => {
                this.setState({
                    light: result,
                    isLightOn: result.state.on,
                    lightName: result.name
                });
            },

                (error) => {
                    this.setState({
                        error
                    });
                })
    }

    handleClick() {
        fetch('/api/lights/' + this.props.lightNr + '/toggle', {
            method: 'PUT',
            body: JSON.stringify({ on: !this.state.isLightOn }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(err => err);

        this.setState(prevState => ({
            isLightOn: !prevState.isLightOn
        }));
    }

    render() {
        const { error, light, lightName, isLightOn } = this.state;
        if (error) {
            return <div> Error: {error.message} </div>;
        } else {

            return (
                <div>
                    <p> Turn: {lightName} </p>
                    <button onClick={this.handleClick}>
                        {isLightOn ? 'OFF' : 'ON'}
                    </button>
                    {light ? < HorizontalSlider lightState={light} lightNr={this.props.lightNr} /> : 'Loading'}
                </div>
            );
        }
    }
}

export default LightState
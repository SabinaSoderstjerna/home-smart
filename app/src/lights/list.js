import React from 'react';

import LightState from './item.js'

class LightList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null }
    };

    componentDidMount() {
        lightsArray().then((result) => {
            var lights = result;
            var listLights = lights.map((light) =>
                <li key={light.toString()}>
                    < LightState lightNr={light} />
                </li>
            );
            this.setState({
                listLights: listLights
            });
        }, (error) => {
            this.setState({
                error: error
            })
        })
    }

    render() {
        const { error, listLights } = this.state;
        if (error) {
            return <div> Error: error.message </div>
        } else {
            return <ul> {listLights} </ul>
        }
    }
}

function lightsArray() {
    return fetch('/api/lights/')
        .then(function (res) {
            return res.json();
        }).then(function (body) {
            return Object.keys(body)
        },
            (error) => {
                return <div> Error: {error.message}) </div>
            });
}

export default LightList
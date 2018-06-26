import React from 'react';

import LightState from './item.js'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

class GroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null }
    };

    componentDidMount() {
        groupsArray().then((result) => {
            console.log(result)
            var groups = result;
            var listGroups = groups.map((group) => 
                < ListLightsInGroup groupNr={group} />
            );

            this.setState({
                listGroups: listGroups,
            });


        }, (error) => {
            this.setState({
                error: error
            })
        })
    }

    render() {
        const { error, listGroups } = this.state;
        if (error) {
            return <div> Error: error.message </div>
        } else {
            return <ul> {listGroups} </ul>
        }
    }
}

function groupsArray() {
    return fetch('/api/groups/')
        .then(function (res) {
            return res.json();
        }).then(function (body) {
            return Object.keys(body)
        },
            (error) => {
                return <div> Error: {error.message} </div>
            });
}

class ListLightsInGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null }
    };

    componentDidMount() { 
        groupProp(this.props.groupNr).then((result) => {
            console.log(result)
            var groupName = result.name;
            var groupLights = result.lights;
            console.log(groupLights)
            var listLights = groupLights.map((light) =>
                <li key={light.toString()}>
                    < LightState lightNr={light} />
        </li> );

            this.setState({
                name: groupName,
                lights: groupLights,
                listLights: listLights,
            });


        }, (error) => {
            this.setState({
                error: error
            })
        })
    }

    render() {
        const { error, name, lights, listLights } = this.state;
        if (error) {
            return <div> Error: error.message </div>
        } else {
            return <ul> <h1>{name}</h1> {listLights} </ul>
        }
    }

}

function groupProp(props) {
    return fetch('/api/groups/' + props)
        .then(function (res) {
            return res.json();
        },
            (error) => {
                return <div> Error: {error.message} </div>
            });
}

export default GroupList
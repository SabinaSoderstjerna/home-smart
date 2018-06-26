import React, { Component } from 'react';
import LightList from './lights/lightList';
import GroupList from './lights/groupList';

class Menu extends Component {
    constructor() {
        super();

        this.state = {
            clickedLight: false,
            clickedGroup: false,
        };
    }

    handleClickLight() {
        this.setState({
            clickedLight: true,
            clickedGroup: false,
        })
    }

    handleClickGroup() {
        this.setState({
            clickedLight: false,
            clickedGroup: true,
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClickLight.bind(this)}> Lights </button>
                <button onClick={this.handleClickGroup.bind(this)}> Groups </button>
                {this.state.clickedLight ? <LightList /> : null}
                {this.state.clickedGroup ? <GroupList /> : null}
            </div>

        );
    }
}

export default Menu
import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-rangeslider';
import {throttle, debounce} from 'throttle-debounce';

import 'react-rangeslider/lib/index.css';

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

function App() {
  return (
    <div>
      <h1> Welcome to home-smart </h1>
      <p> An app to make your home smarter </p>
      < LightList />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
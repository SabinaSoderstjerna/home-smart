import React from 'react';
import ReactDOM from 'react-dom';

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
    this.setState(prevState => ({
      isLightOn: !prevState.isLightOn
    }));
    fetch('/api/lights/' + this.props.lightNr + '/toggle', {
      method: 'PUT',
      body: JSON.stringify({ on: this.state.isLightOn }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(err => err);
  }

  render() {
    const { error, lightName, isLightOn } = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else {
      return (
        <div>
          <p> Turn: {lightName} </p>
          <button onClick={this.handleClick}>
            {isLightOn ? 'OFF' : 'ON'}
          </button>
        </div>
      );
    }
  }
}

function LightList(props) {
  console.log(props.lights)
  props.lights.then((result) => {
    console.log(result);
    var lights = result;
    this.setState(lights.map((light) => ({
      listLights:
        <li key={light.toString()}>
          < LightState lightNr={light} />
        </li>
    })));
  }, (error) => {
    return <div> Error: {error.message} </div>
  })
  return (
    <ul>{this.state.listLights}</ul>
  );
}

function App() {
  return (
    <div>
      <h1> Welcome to home-smart </h1>
      <p> An app to make your home smarter </p>
      < LightList lights={lightsArray()} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';

const lights = [1, 2, 3, 4];

class LightState extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLightOn: true };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    this.setState(prevState => ({
      isLightOn: !prevState.isLightOn
    }));
  }

  render() {
    return (
      <div>
        <p> Turn: {this.props.lightName} </p>
        <button onClick={this.handleClick}>
          {this.state.isLightOn ? 'ON' : 'OFF'}
        </button>
      </div>
    );
  }
}

function LightList(props) {
  const lights = props.lights;
  const listLights = lights.map((light) =>
    <li key={light.toString()}>
      < LightState lightName={light} />
    </li>
  );
  return (
    <ul>{listLights}</ul>
  );
}

function App() {
  return (
    <div>
      <h1> Welcome to home-smart </h1>
      <p> An app to make your home smarter </p>
      < LightList lights={lights} />
      < MyComponent />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
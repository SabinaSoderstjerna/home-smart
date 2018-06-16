import React from 'react';
import ReactDOM from 'react-dom';

const lights = [1, 2, 3, 4, 5, 6];

function GetAllLights() {
  fetch('/api/lights/')
    .then(results => {
      return results.json()
    }).then((result) => {
      console.log(result)
      return result
    }
    )
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
  const lights = props.lights;

  const listLights = lights.map((light) =>
    <li key={light.toString()}>
      < LightState lightNr={light} />
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
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
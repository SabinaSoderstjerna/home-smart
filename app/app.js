import React from 'react';
import ReactDOM from 'react-dom';

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
    const { error, lightName, isLightOn } = this.state;
    console.log(isLightOn)
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
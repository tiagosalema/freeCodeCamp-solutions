import React from "react";
import ReactDOM from "react-dom";
import "./App.scss";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const playAudio = keyTrigger => {
  var x = document.getElementById(keyTrigger);
  x && x.play();
};

class Button extends React.Component {
  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
  }
  onKeyPressed = key => {
    if (key.key.toUpperCase() === this.props.keyTrigger) {
      const x = document.getElementById(key.key.toUpperCase()).parentElement;
      x.classList.add("clicked");
      x.click();
      setTimeout(() => x.classList.remove("clicked"), 100);
    }
  };

  render() {
    const { keyTrigger, id, url } = this.props;
    return (
      <div
        className="drum-pad"
        id={id}
        onClick={() => {
          playAudio(keyTrigger);
          this.props.onChange(id);
        }}
      >
        <audio src={url} className="clip" id={keyTrigger} />
        <span>{keyTrigger}</span>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    id: ""
  };
  render() {
    return (
      <div id="drum-machine">
        <div id="dummie" />
        <div id="keys">
          {bankOne.map(({ keyTrigger, id, url }, i) => (
            <Button
              onChange={id => this.setState({ id })}
              key={i}
              keyTrigger={keyTrigger}
              id={id}
              url={url}
            />
          ))}
        </div>
        <div id="display">{this.state.id}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

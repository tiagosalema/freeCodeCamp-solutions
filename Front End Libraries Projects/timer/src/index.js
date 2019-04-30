import React from "react";
import ReactDOM from "react-dom";
import "./App.scss";

const Change = ({ title, amount, increment, decrement }) => (
  <div id={title + "-label"}>
    {/* title = break / session */}
    <h4>{title[0].toUpperCase() + title.substring(1)} Length</h4>
    <div id={title + "-increment"} onClick={increment}>
      <i className="fa fa-chevron-circle-up" />
    </div>
    <span id={title + "-length"}>{amount}</span>
    <div id={title + "-decrement"} onClick={decrement}>
      <i className="fa fa-chevron-circle-down" />
    </div>
  </div>
);

class App extends React.Component {
  state = {
    timeLeft: [25, 0],
    sessionLength: 25,
    breakLength: 5,
    paused: true,
    session: true
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const {
        timeLeft: [min, sec],
        session,
        breakLength,
        sessionLength
      } = this.state;
      const timeLeft = sec ? [min, sec - 1] : [min - 1, 59];
      !min && sec === 1 && document.getElementById("beep").play();
      if (!min && !sec) {
        let inc_min = session ? breakLength : sessionLength;
        return this.setState({ session: !session, timeLeft: [inc_min, 0] });
      } else return !this.state.paused && this.setState({ timeLeft });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  displayTime = () => {
    const { timeLeft } = this.state;
    let minutes = timeLeft[0];
    let seconds = timeLeft[1] < 10 ? "0" + timeLeft[1] : timeLeft[1];
    return minutes + ":" + seconds;
  };

  render() {
    const { sessionLength, breakLength, paused, session } = this.state;
    return (
      <div id="container">
        <div id="title">
          <h2>Pomodoro Clock</h2>
          <audio src="https://goo.gl/65cBl1" className="clip" id="beep" />
        </div>
        <Change
          title="break"
          amount={breakLength}
          increment={() =>
            this.state.paused &&
            this.setState({
              breakLength: breakLength < 60 ? breakLength + 1 : breakLength
            })
          }
          decrement={() =>
            this.state.paused &&
            this.setState({
              breakLength: breakLength > 1 ? breakLength - 1 : breakLength
            })
          }
        />
        <Change
          title="session"
          amount={sessionLength}
          increment={() =>
            this.state.paused &&
            this.setState({
              sessionLength: sessionLength < 60 ? sessionLength + 1 : sessionLength,
              timeLeft: [sessionLength < 60 ? sessionLength + 1 : sessionLength, 0]
            })
          }
          decrement={() =>
            this.state.paused &&
            this.setState({
              sessionLength: sessionLength > 1 ? sessionLength - 1 : sessionLength,
              timeLeft: [sessionLength > 1 ? sessionLength - 1 : sessionLength, 0]
            })
          }
        />
        <div id="countdown">
          <h4 id="timer-label">{session ? "Session" : "Break"}</h4>
          <h1 id="time-left">{this.displayTime()}</h1>
        </div>
        <div id="buttons">
          <button id="start_stop" onClick={() => this.setState({ paused: !paused })}>
            <div className={!this.state.paused && "hide"}>
              <i className="icon fa fa-play" />
            </div>
            <div className={this.state.paused && "hide"}>
              <i className="icon fa fa-pause" />
            </div>
          </button>
          <button
            id="reset"
            onClick={() =>
              this.setState({
                timeLeft: [25, 0],
                sessionLength: 25,
                breakLength: 5,
                paused: true,
                session: true
              })
            }
          >
            <i className="icon fa fa-sync" />
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

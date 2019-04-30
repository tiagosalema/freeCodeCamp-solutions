import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";

let root = document.documentElement;
const colorArray = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
  "#3cb44b",
  "#4363d8",
  "#46f0f0",
  "#008080",
  "#800000",
  "#000075",
  "#000000",
  "#009245",
  "#0193D9",
  "#0C04ED",
  "#612F90",
  "#2f7ed8",
  "#0d233a",
  "#1aadce",
  "#492970",
  "#f28f43",
  "#77a1e5"
];

class App extends Component {
  getQuotes = () =>
    fetch("https://breaking-bad-quotes.herokuapp.com/v1/quotes/")
      .then(res => res.json())
      .then(data => {
        this.setState({ quotes: data });
      })
      .catch(err => console.log(err));
  async componentDidMount() {
    this.getQuotes();
  }

  state = {
    quotes: [
      {
        quote: "",
        author: ""
      }
    ]
  };
  handleClick = () => {
    this.getQuotes();
    root.style.setProperty(
      "--color",
      colorArray[Math.floor(Math.random() * colorArray.length)]
    );
  };
  render() {
    const twitterAPI = `https://twitter.com/intent/tweet?hashtags=quotes&text="${
      this.state.quotes[0].quote
    }"`;
    return (
      <div id="quote-box">
        <div id="text">{this.state.quotes[0] && <p>{this.state.quotes[0].quote}</p>}</div>
        <div id="author">- {this.state.quotes[0] && this.state.quotes[0].author}</div>
        <button id="new-quote" class="btn btn-primary" onClick={this.handleClick}>
          New quote
        </button>
        {
          <a id="tweet-quote" target="_blank" rel="noopener noreferrer" href={twitterAPI}>
            <i className="icon fab fa-twitter" aria-hidden="true" target="_blank" />
          </a>
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

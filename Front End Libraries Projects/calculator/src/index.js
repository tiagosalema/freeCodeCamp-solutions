import React from "react";
import ReactDOM from "react-dom";
import "./App.scss";

const Button = ({ text, id, onClick }) => (
  <div className="button" id={id} onClick={() => onClick(text)}>
    {text}
  </div>
);
const buttons = [
  {
    digit: "AC",
    id: "clear",
    alt: "Delete"
  },
  {
    digit: "/",
    id: "divide"
  },
  {
    digit: "x",
    id: "multiply",
    alt: "*"
  },
  {
    digit: 7,
    id: "seven"
  },
  {
    digit: 8,
    id: "eight"
  },
  {
    digit: 9,
    id: "nine"
  },
  {
    digit: "-",
    id: "subtract"
  },
  {
    digit: 4,
    id: "four"
  },
  {
    digit: 5,
    id: "five"
  },
  {
    digit: 6,
    id: "six"
  },
  {
    digit: "+",
    id: "add"
  },
  {
    digit: 1,
    id: "one"
  },
  {
    digit: 2,
    id: "two"
  },
  {
    digit: 3,
    id: "three"
  },
  {
    digit: 0,
    id: "zero"
  },
  {
    digit: ".",
    id: "decimal",
    alt: ","
  },
  {
    digit: "=",
    id: "equals",
    alt: "Enter"
  }
];

class App extends React.Component {
  state = {
    eq: "0",
    input: "0",
    newOne: 0
  };

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
  }

  onKeyPressed = ({ key }) => {
    if (
      buttons.some(
        x => x.digit + "" === key || ["*", "Enter", "Delete"].indexOf(key) !== -1
      )
    ) {
      let index = buttons.findIndex(
        x => x.digit + "" === key || (x.alt && x.alt === key)
      );
      const x = document.getElementById(buttons[index].id);
      x.classList.add("selected");
      x.click();
      setTimeout(() => x.classList.remove("selected"), 60);
    }
  };

  isOperator = pressed => ["+", "-", "x", "/"].indexOf(pressed) !== -1;
  compute = expression => {
    expression = expression
      .replace(/([+\-x\/\^])/g, (_, p) => "!" + p + "!")
      .split("!")
      .map(x => (parseFloat(x) ? parseFloat(x) : x));

    var operations = [
        {
          x: (a, b) => (a * Math.pow(10, 10) * b * Math.pow(10, 10)) / Math.pow(10, 20), // Little workaround to avoid the infinite result for the e.g. 0.1*0.1
          "/": (a, b) => a / b
        },
        { "+": (a, b) => a + b, "-": (a, b) => a - b }
      ],
      acc = [],
      operation;

    for (var i = 0; i < operations.length; i++) {
      for (var j = 0; j < expression.length; j++) {
        if (operations[i][expression[j]]) operation = operations[i][expression[j]];
        else if (operation) {
          let i = acc.length - 1;
          acc[i] = operation(acc[i], expression[j]);
          operation = null;
        } else acc.push(expression[j]);
      }
      expression = acc;
      acc = [];
    }
    return expression[0];
  };

  display = pressed => {
    let { eq, input, newOne } = this.state;
    if (pressed === "AC") {
      input = "0";
      eq = "";
      this.setState({ newOne: 0 });
    } else if (eq === "0")
      pressed === "." ? (eq = input = "0.") : (eq = input = "" + pressed);
    else if (typeof pressed === "number") {
      eq = newOne ? pressed : eq + pressed;
      input = !newOne && parseFloat(input) ? input + pressed : "" + pressed;
      this.setState({ newOne: 0 });
    } else if (this.isOperator(pressed)) {
      if (!newOne && !this.isOperator(input)) {
        eq = eq + pressed;
      } else if (this.isOperator(input)) {
        eq = eq.slice(0, eq.length - 1) + pressed;
      } else {
        eq = input + pressed;
      }
      this.setState({ newOne: 0 });
      input = pressed;
    } else if (pressed === "=") {
      if (!newOne) {
        eq = this.isOperator(eq[eq.length - 1]) ? eq.slice(0, -1) : eq;
        let tot = typeof parseInt(input) ? this.compute(eq) : "Infinity";

        eq = eq + "=" + tot;
        input = "" + tot;
        this.setState({ newOne: 1 });
      }
    } else if (pressed === ".") {
      let _;
      console.log({ input });

      if (newOne || eq === "0") {
        eq = "0.";
        input = "0.";
      } else if (input.split("").some(x => x === pressed)) _ = null;
      else if (this.isOperator(input[input.length - 1])) {
        eq += "0.";
        input = "0.";
      } else {
        eq += ".";
        input += ".";
      }
      this.setState({ newOne: 0 });
    }

    this.setState({ input, eq });
  };
  render() {
    const { input, eq } = this.state;
    return (
      <div id="calculator">
        <div id="display">
          <div id="output">{eq}</div>
          <div id="input">{input}</div>
        </div>
        <div id="buttons">
          {buttons.map(({ digit, id }) => (
            <Button
              key={id}
              text={digit}
              id={id}
              onClick={pressed => this.display(pressed)}
            />
          ))}
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

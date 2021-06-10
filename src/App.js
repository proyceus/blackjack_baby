import React from "react";
import "./App.css";
import Button from "./Components/Button/Button";
import Card from "./Components/Card/Card";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      number1: 0,
      number2: 0,
      isHit: false,
      total: 0,
      openOldCards: false,
      oldCards: [],
      firstHand: true,
      start: false,
    };

    this.handleHitClick = this.handleHitClick.bind(this);
    this.handleHoldClick = this.handleHoldClick.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  deck = [
    2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8,
    8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10,
  ];

  getNum() {
    return this.deck[Math.floor(Math.random() * this.deck.length)];
  }

  getTotal() {
    return this.state.number1 + this.state.number2;
  }

  handleHitClick() {
    if (this.state.isHit === false) {
      let num1 = this.getNum();
      let num2 = this.getNum();
      this.setState({ number1: num1 });
      this.setState({ number2: num2 });
      this.updateTotal(num1, num2);
      this.setState({ isHit: true });
    }

    if (this.state.isHit === true) {
      let num1 = this.getNum();
      this.setState({ number1: num1 });
      this.setState({ number2: 0 });
      this.setState({ openOldCards: true });
      this.updateTotal(num1, 0);
      this.addCards();
    }
  }

  addCards() {
    if (this.state.firstHand === true) {
      this.setState((prevState) => ({
        oldCards: [
          ...prevState.oldCards,
          this.state.number1,
          this.state.number2,
        ],
      }));
      this.setState({ firstHand: false });
    } else {
      this.setState((prevState) => ({
        oldCards: [...prevState.oldCards, this.state.number1],
      }));
    }
  }

  updateTotal(num1, num2) {
    this.setState((prevState) => ({
      total: prevState.total + num1 + num2,
    }));
  }

  handleHoldClick() {
    this.setState({
      number1: 0,
      number2: 0,
      isHit: false,
      total: 0,
      openOldCards: false,
      oldCards: [],
      firstHand: true,
    });
  }

  startGame() {
    this.setState({ start: true });
  }

  render() {
    if (this.state.start === false) {
      return (
        <div className="App">
          <h1>Blackjack Baby!</h1>
          <Button onClick={this.startGame} text="Start game!" />
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="cards_container">
            {this.state.number1 > 0 && <Card number={this.state.number1} />}
            {this.state.number2 > 0 && <Card number={this.state.number2} />}
          </div>

          {this.state.total < 21 && (
            <Button onClick={this.handleHitClick} text="Hit" />
          )}
          {this.state.total < 21 && (
            <Button onClick={this.handleHoldClick} text="Hold" />
          )}
          <div className="scoreboard">Total: {this.state.total}</div>
          {this.state.total > 21 && (
            <div className="App">
              <div className="losetext">You lose!</div>
              <Button onClick={this.handleHoldClick} text="Retry" />
            </div>
          )}
          {this.state.total === 21 && (
            <div className="App">
              <div className="losetext">Blackjack!</div>
              <Button onClick={this.handleHoldClick} text="Play Again" />
            </div>
          )}
          <div className="oldcard_container">
            {this.state.openOldCards &&
              this.state.oldCards.map((item) => {
                return <Card number={item} className="oldcard" />;
              })}
          </div>
        </div>
      );
    }
  }
}

export default App;

import React from "react";
import "./Card.css";

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="score_container">
        <div className="score">{this.props.number}</div>
      </div>
    );
  }
}

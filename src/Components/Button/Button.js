import React from "react";
import "./Button.css";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button onClick={this.props.onClick}>{this.props.text}</button>;
  }
}

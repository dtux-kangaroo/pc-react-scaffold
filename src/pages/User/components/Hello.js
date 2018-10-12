import React from "react";
export default class Hello extends React.PureComponent {
  render(){
    const {name} = this.props;
    return (
      <div className="welcome">
        Hello,{name}!
      </div>
    )
  }
}
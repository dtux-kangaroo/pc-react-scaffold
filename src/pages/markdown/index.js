import React, { Component, PropTypes } from "react";
import moment from "moment";
moment.locale("zh-cn");

import './style.scss'

class Markdown extends Component{
  constructor(props){
    super(props)
    this.state = {
      markdown_input: '# This is a header\n\nAnd this is a paragraph'
    }
  }

  componentDidMount(){
  }

  render(){
    return(
      <div>
      <p>dsaasdasdas</p>
      </div>
    )
  }
}

export default Markdown
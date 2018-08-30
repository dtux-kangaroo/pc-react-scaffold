import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import testjson from '../../constants/test'
import './style.scss';

class JsonView extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <ReactJson src={testjson} collapsed={false} iconStyle='triangle' theme='Monokai'  />
        )
    }
}

export default JsonView;
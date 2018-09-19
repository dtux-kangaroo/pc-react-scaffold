import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import testjson from '../../constants/test'
import './style.scss';

class JsonView extends Component{
    constructor(props){
        super(props)
    }

    edit = (edit) => {
        console.log(edit)
    }
    render(){
        return(
            <ReactJson 
                src={testjson} 
                collapsed={false} 
                iconStyle='triangle' 
                theme='flat'  
                onEdit={this.edit}
                style={{fontSize: '14px',width: '90%',margin: 'auto'}}
            />
        )
    }
}

export default JsonView;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Button } from 'antd';
import { Link } from "react-router-dom";

class PageHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {title,content,extra,breadcrumb,crumbItem}=this.props;
        return (
            <div className="comp-page-header">
                <div className="pg-main">
                    {
                        breadcrumb&&(<Breadcrumb className="breadcrumb">
                            {
                                crumbItem.map((item,index) =>{
                                    return (
                                        <Breadcrumb.Item key={index}>
                                        {
                                        index !=(crumbItem.length - 1) ? <Link to={item.url}>{item.text}</Link>:item.text
                                        }
                                        </Breadcrumb.Item>
                                    )
                                } )
                            }
                        </Breadcrumb>)
                    }
                    
                    <div className="pg-detail">
                        <div className="pg-title">{title}</div>
                        <div className="pg-content">{content}</div>
                    </div>
                </div>
                {
                    extra&&(
                        <div className="pg-btn-wrap">
                        {
                            extra
                        }
                         </div>
                    )
                }
            </div>
        )
    }
}

PageHeader.defaultProps={
    title:'title',
    content:'content',
    Breadcrumb:false,
    crumbItem:[{text:'home',url:'/app'}],
    extra:null,
}
PageHeader.propTypes = {
    title:PropTypes.string,
    content:PropTypes.string,
    Breadcrumb:PropTypes.bool,
    crumbItem:PropTypes.arrayOf(PropTypes.any),
    extra:PropTypes.any,
}

export default PageHeader
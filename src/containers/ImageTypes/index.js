import React, { Component } from 'react';
import { Menu } from 'antd';
import { getImageTypes } from '../../utils/get'
const { SubMenu } = Menu;

class ImageTypes extends Component {
  state = { 
    list: []
  }

  componentDidMount() {
    getImageTypes().then(res => {
      console.log(res)
      if (res.showapi_res_body && res.showapi_res_body.list) {
        this.setState({ list: res.showapi_res_body.list })
      }
    }).catch(err => {
      console.error(err)
    })
  }

  onSelect = (item, key, selectedKeys) => {
    if (item.key && this.props.onSelect) {
      this.props.onSelect(item.key)
    }
  }

  render() {
    return (
        <Menu
          mode="inline"
          defaultSelectedKeys={["0"]}
          onSelect={this.onSelect}
        >
        {this.state.list.map((item, index) => {
          return <SubMenu key={index} title={<span>{item.name}</span>}>
            {item.list.map((subItem, subIndex) => {
              return <Menu.Item key={subItem.id}>{subItem.name}</Menu.Item>
            })}
          </SubMenu>
        })}
      </Menu>
    );
  }
}

export default ImageTypes;


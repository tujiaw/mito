import React, { Component } from 'react';
import { Button } from 'antd'

class LeftRightButton extends Component {
  state = {  }
  render() {
    return (
      <div style={{
        position: 'fixed', 
        bottom: this.props.bottom || 50,
        right: this.props.right || 60,
        height: this.props.height || 120,
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between'}}
      >
      { 
        this.props.onClose 
        ? <Button type="primary" shape="circle" icon="close" onClick={this.props.onClose } style={ Style.button }/> 
        : null
      }
      {
        this.props.onLeft
        ? <Button type="primary" shape="circle" icon="caret-left" 
            onClick={this.props.onLeft} style={ Style.button } 
            disabled={this.props.leftDisabled ? 'disabled' : ''}
          />
        : null
      }
      {
        this.props.onRight
        ? <Button type="primary" shape="circle" icon="caret-right" 
            onClick={this.props.onRight} style={ Style.button } 
            disabled={this.props.rightDisabled ? 'disabled' : ''}
          />
        : null
      }
      </div>
    );
  }
}

const Style = {}
Style.button = {
  background: 'rgba(0, 0, 0, 0.75)',
  border: 0,
}

export default LeftRightButton;
import React, { Component } from 'react';
import ReactModal from 'react-modal'
import LeftRightButton from '../../components/LeftRightButton'
import { ANTI_LEECH } from '../../config'

class ShowImages extends Component {
  state = {
    showIndex: 0
  }

  onClose = () => {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  onLeft = () => {
    const { list } = this.props.data
    if (this.state.showIndex > 0) {
      this.setState({ showIndex: this.state.showIndex - 1})
    } else {
      this.setState({ showIndex: list.length - 1})
    }
  }

  onRight = () => {
    const { list } = this.props.data
    if (this.state.showIndex >= list.length - 1) {
      this.setState({ showIndex: 0})
    } else {
      this.setState({ showIndex: this.state.showIndex + 1})
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showIndex: nextProps.data.index })
  }

  render() {
    const { list, isVisible } = this.props.data

    return isVisible ? (
        <ReactModal
          isOpen={isVisible}
          onRequestClose={this.onClose}
          contentLabel="Modal"
          style={Style.modal}
          role="dialog"
        >
          <LeftRightButton 
            bottom={60}
            right={70}
            height={120}
            onClose={this.onClose}
            onLeft={this.onLeft}
            onRight={this.onRight}
          />
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {
              list && list[this.state.showIndex] 
              ? <img src={ANTI_LEECH + list[this.state.showIndex].big} alt=""/> 
              : null
            }
          </div>
        </ReactModal>
    ) : null
  }
}

const Style = {}
Style.modal = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',
  }
}

export default ShowImages;
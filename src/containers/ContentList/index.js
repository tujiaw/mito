import React, { Component } from 'react';
import { Collapse } from 'antd';
import { ANTI_LEECH, getNewImageUrl } from '../../config'
const Panel = Collapse.Panel;

let index = 0
class ContentList extends Component {
  state = {  }

  onClick(itemId, subIndex) {
    if (this.props.showImages) {
      this.props.showImages(itemId, subIndex)
    }
  }

  render() {
    return (
      <Collapse 
        bordered={false} 
        defaultActiveKey={['0']}
        key={++index}
      >
        {this.props.list && this.props.list.map((item, index) => {
          return <Panel header={item.title || ''} key={item.itemId || index}>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {item.list && item.list.map((subItem, subIndex) => {
                return <img key={`${item.itemId}-${subIndex}`} 
                  style={{margin: 3}} 
                  alt={subIndex} 
                  src={getNewImageUrl(subItem.small)} 
                  onClick={this.onClick.bind(this, item.itemId, subIndex)}
                />
              })}
            </div>
          </Panel>
        })}
      </Collapse>
    );
  }
}

export default ContentList;
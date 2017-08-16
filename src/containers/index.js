import React from 'react';
import { Layout } from 'antd';
import ImageTypes from './ImageTypes'
import ContentList from './ContentList'
import ShowImages from './ShowImages'
import { getImages } from '../utils/get'
import LeftRightButton from '../components/LeftRightButton'
import { postData } from '../utils/fetch'
import { DOWNLOAD_URL } from '../config'
const { Header, Content, Sider } = Layout;

const g_pagebeanCache = {}
class Home extends React.Component {
  state = {
    isLoading: false,
    curType: 0,
    curPage: 1,
    pagebean: {},
    showImagesData: {},
    width: window.innerWidth,
    height: window.innerHeight,
    leftDisabled: true,
    rightDisabled: false,
  };


  onSelect = (key) => {
    this.loadImages(key, 1);
  }

  onLeft = () => {
    const { curType, curPage } = this.state
    if (curPage - 1 < 1) {
      return
    }
    this.loadImages(curType, curPage - 1)
  }

  onRight = () => {
    const { curType, curPage, pagebean } = this.state
    if (pagebean && pagebean.allPages && curPage + 1 > pagebean.allPages) {
      return
    }
    this.loadImages(curType, curPage + 1)
  }

  loadImages = (type, page) => {
    if (this.state.isLoading) {
      return
    }

    const typePage = `${type}-${page}`
    if (g_pagebeanCache[typePage]) {
      this.setState({
        curType: type,
        curPage: page,
        pagebean: g_pagebeanCache[typePage],
        leftDisabled: page <= 1,
        rightDisabled: page >= g_pagebeanCache[typePage].allPages
      })
      console.log('cache find, ' + typePage)
      return
    }

    console.log('type:' + type + ',page:' + page)
    this.setState({ isLoading: true })
    getImages(type, page).then(res => {
      if (res.showapi_res_body && res.showapi_res_body.pagebean) {
        const curPagebean = res.showapi_res_body.pagebean
        this.setState({ 
          isLoading: false,
          curType: type,
          curPage: page,
          pagebean: curPagebean,
          leftDisabled: page <= 1,
          rightDisabled: page >= curPagebean.allPages
        })
        g_pagebeanCache[typePage] = curPagebean
        
        const imagesUrl = {
          smallList: [],
          bigList: [],
        }
        for (const content of curPagebean.contentlist) {
          for (const item of content.list) {
            imagesUrl.smallList.push(item.small)
            imagesUrl.bigList.push(item.big)
          }
        }

        console.log('post data:' + imagesUrl)
        postData(DOWNLOAD_URL, imagesUrl).then(res => {
          console.log('post data response:' + res)
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      this.setState({ isLoading: false })
    })
  }

  onShowImages = (itemId, subIndex) => {
    const { contentlist } = this.state.pagebean
    if (contentlist && contentlist.length) {
      const findItem = contentlist.find(item => {
        return item['itemId'] === itemId
      })
      if (findItem) {
        this.setState({
          showImagesData: {
            isVisible: true,
            index: subIndex,
            list: findItem.list
          }
        })
      }
    }
  }

  onShowImagesClose = () => {
    this.setState({ showImagesData: {
      isVisible: false
    }})
  }

  onResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    const { contentlist } = this.state.pagebean
    return (
    <Layout>
        <Header className="header">
          <h1 style={{ color: '#fff'}}>美图大全</h1>
        </Header>
        <Content>
          <Layout style={{ background: '#fff'}}>
            <Sider style={{overflow: 'auto', height: this.state.height - 63}}>
              <ImageTypes onSelect={this.onSelect}/>
            </Sider>
            <Content style={{margin: 10, height: this.state.height - 80}}>              
              {contentlist
                ? <ContentList list={contentlist} showImages={this.onShowImages}/>
                : '请选择图片类型' }
              {contentlist
                ? <LeftRightButton 
                    bottom={50}
                    right={50}
                    height={80}
                    onLeft={this.onLeft}
                    onRight={this.onRight}
                    leftDisabled={this.state.leftDisabled}
                    rightDisabled={this.state.rightDisabled}
                  />
                : null
              }
            </Content>
          </Layout>
        </Content>
        <ShowImages data={this.state.showImagesData} onClose={this.onShowImagesClose}/>
    </Layout>)
  }
}

export default Home
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/nodes/nodes',
    'pages/hot/hot',
    'pages/node_detail/node_detail',
    'pages/thread_detail/thread_detail',
    'pages/wx/index',
  ],
  tabBar: {
    list: [{
      'iconPath': 'resource/latest.png',
      'selectedIconPath': 'resource/lastest_on.png',
      pagePath: 'pages/index/index',
      text: '最新'
    }, {
      'iconPath': 'resource/hotest.png',
      'selectedIconPath': 'resource/hotest_on.png',
      pagePath: 'pages/hot/hot',
      text: '热门'
    }, {
      'iconPath': 'resource/node.png',
      'selectedIconPath': 'resource/node_on.png',
      pagePath: 'pages/nodes/nodes',
      text: '节点'
    }, {
      'iconPath': 'resource/wx.png',
      'selectedIconPath': 'resource/wx.png',
      pagePath: 'pages/wx/index',
      text: 'wx'
    }],
    'color': '#000',
    'selectedColor': '#56abe4',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})

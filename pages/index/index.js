//index.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '{{movie[0].images.large}}.jpg',
      '{{movie[0].images.large}}',
      '{{movie[0].images.large}}'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    movie:[]
  },

  goToDetail: function(e){
    var index = parseInt(e.currentTarget.dataset.index)
    console.log('index' + index)
    wx.navigateTo({
      url: '../detail/detail?id='+index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadMovie();      
  },
  loadMovie(){
    wx.showToast({
      title: 'loading...',
      icon: 'loading',
      duration: 2000
    })
    let thisPage = this;
    wx.request({
      // url: 'https://douban.uieee.com/v2/movie/in_theaters',
      url: app.globalData.apiHeader + '/v2/movie/in_theaters',
      method: "GET",
      header: {'content-type':'json'},
      success: function(res){
        console.log(res)
        let subject = res.data.subjects
        thisPage.setData({ movie:subject })
      }
    })
  },
  onPullDownRefresh:function(){
    this.loadMovie()
    wx.stopPullDownRefresh()
  }
  ,
  goToDetail:function(e){
    app.goToDetail(e)
  }
})
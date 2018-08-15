// pages/top/top.js
var app = getApp()
Page({
  data: {
    movie: [],
    hiddenEnd: true,
    num: 0
  },

  onLoad: function (options) {
    this.showMovie()
  },

  onReachBottom: function(){
    if (!this.data.hiddenEnd){
      return
    }
    this.showMovie()
  },

  showMovie:function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    })
    this.loadMovie()
  },

  loadMovie: function(num){
    
    var thisPage = this
    wx.request({
      url: app.globalData.apiHeader + '/v2/movie/top250?start=' + thisPage.data.num + "&count=20",
      method:'GET',
      header: { "Content-Type": "json" },
      success: function(res){
        // console.log(res)
        var subjects = res.data.subjects
        thisPage.setData({
          movie: thisPage.data.movie.concat(subjects)
        })
        thisPage.setData({
          num: thisPage.data.num + 20
        })
        if(subjects.length < 20){
          thisPage.setData({
            hiddenEnd: false
          })
          return
        }
      }
    })
  }
 ,
  onPullDownRefresh: function () {
    this.refresh()
    wx.stopPullDownRefresh()
  },
  refresh:function(){
    wx.showToast({
      title: 'loading...',
      icon: 'loading',
      duration: 2000
    })
    let thisPage = this
    wx.request({
      url: app.globalData.apiHeader + '/v2/movie/top250',
      method: 'GET',
      header: {
        'content-type':'json'
      },
      success:function(res){
        thisPage.setData({
          movie: res.data.subjects
        })
      }
    })
  }
 ,
  goToDetail:function(e){
    app.goToDetail(e)
  }
})
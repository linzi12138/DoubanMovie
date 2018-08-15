var subjectUtil = require("../../utils/processUtil.js")
var app = getApp();

Page({

  data: {
    inputWord: "",
    movie: []
  },
  getInputWord: function(e) {
    this.setData({
      inputWord: e.detail.value
    })
  },

  search: function(e) {
    var thisPage = this
    if (thisPage.data.inputWord == '') {
      wx.showToast({
        title: '请输入内容',
        image: '../../images/warning.png',
        duration: 1500
      })
      return false
    }
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1500
    })

    var url = app.globalData.apiHeader + '/v2/movie/search?q=' + thisPage.data.inputWord
    // console.log(url)
    wx.request({
      url: url,
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        var subjects = res.data.subjects
        if (subjects.length < 1) {
          wx.showToast({
            title: '无相关内容',
            image: '/images/warning.png',
            duration: 1500
          })
          return 
        }
        subjectUtil.porcessSubjects(subjects)
        thisPage.setData({
          movie: subjects
        })
        // console.log(res.data.subjects[0].casts[0].name)
      }
    })
  },
  goToDetail: function(e){
    app.goToDetail(e)
  }
})
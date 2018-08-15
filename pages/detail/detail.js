// pages/detial/detial.js
var app = getApp()
Page({
  data: {
    movie: {},
    getIndex: "",
    hidden: true,
    actorImg: "",
    actorName: "",
    actorGender: "",
    actorBirthday: "",
    actorSummary: "",
    bornPlace: "",
    professions: "",
  },
  showText1:function(){
    wx.showToast({
      title: '可是我没有钱',
      image: '../../images/warning.png',
      duration: 1500
    })
  },
  showText2: function () {
    wx.showToast({
      title: '？？？',
      image: '../../images/warning.png',
      duration: 1500
    })
  }
  ,
  showName: function (event) {
    this.setData({
      hidden: false
    })
    var thisPage = this
    wx.request({
      url: app.globalData.apiHeader + '/v2/movie/celebrity/' + event.currentTarget.dataset.id,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function(res){
        console.log(res.data)
        let subject = res.data
        thisPage.setData({
          actorName: subject.name,
          actorImg: subject.avatars.medium,
          actorGender: subject.gender,
          actorBirthday: subject.birthday,
          actorSummary: subject.summary,
          bornPlace: subject.born_place,
          professions: subject.professions
        })
      }
    })
    
  },

  modalCancel:function(){
    this.setData({
      hidden:true
    })
  },
  onLoad: function(options) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1200
    })
    var movieId = options.id
    this.loadData(movieId);
  },

  loadData: function(movieId) {
    let thisPage = this
    wx.request({
      // url: 'http://t.yushu.im/v2/movie/subject/:id=169',
      url: app.globalData.apiHeader + '/v2/movie/subject/' + movieId,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        let subject = res.data
        console.log(subject)
        thisPage.setData({
          movie: subject
        })
      }
    })
  }
})
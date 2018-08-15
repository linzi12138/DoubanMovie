function porcessSubjects(subjects){
  for(var i = 0,num = subjects.lengh; i < num ; i++){
    var subject = subjects[i]
    this.porcessSubject(subject)
  }
}

function porcessSubject(subject){
  var title = subject.title
  var directors = subject.directors[0].name
  var casts = subject.casts
  var castItem = ""
  var genres = subject.genres
  var genresItem = ""
  var year = subject.year
  
  casts.forEach(e => castItem += e.name + "/")
  if(castItem != ""){
    castItem = castItem.substring(0, castItem.length-2)
  }
  genresItem.forEach(e => genresItem += "/")
  if(genresItem != ""){
    genresItem = genresItem.substring(0,genresItem.length-2)
  }

  var text = "名称" + title + "\n导演" + directors + "\n演员" + castItem + "\n类型" + genresItem + "\n上映时间" + year
  subject.text = text
}

module.exports = {
  porcessSubjects: porcessSubjects,
  porcessSubject: porcessSubject
}
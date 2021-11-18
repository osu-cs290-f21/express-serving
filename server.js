var express = require('express')
var logger = require('./logger')

var app = express()

app.use(logger)

app.use(express.static('public'))

app.use(function (req, res, next) {
  console.log("  -- second middleware")
  next()
  // res.send()
})

app.use(function (req, res, next) {
  console.log("  -- third middleware")
  next()
  // res.send()
})

app.get('/about', function (req, res, next) {
  console.log("  -- about page requested")
  // res.status(200)
  res.status(200).send("<html><body><h1>About page!!!</h1></body></html>")
})

app.get('/', function (req, res, next) {
  console.log("  -- home page requested")
  res.status(200).sendFile(__dirname + '/public/index.html')
})

var availablePeople = [
  'luke',
  'leia',
  'rey',
  'finn',
  'r2d2'
]

app.get('/people/:person', function (req, res, next) {
  console.log("  -- person page requested")
  console.log("  -- req.params.person:", req.params.person)
  var person = req.params.person
  if (availablePeople.indexOf(person) !== -1) {
    res.status(200).sendFile(__dirname + '/public/people/' + person + '.html')
  } else {
    next()
  }
})

app.get('/:user/status/:id', function (req, res, next) {
  console.log("  -- tweet page requested")
  console.log("  -- req.params:", req.params)
  next()
})

app.get('*', function (req, res, next) {
  console.log("  -- 404!")
  res.status(404).sendFile(__dirname + '/public/404.html')
})

// app.post()
// app.patch()
// app.put()
// app.delete()

app.listen(8000, function () {
  console.log("== Server is listening on port 8000")
})

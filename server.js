var express = require('express')

var app = express()

app.use(function (req, res, next) {
  console.log("== Request received")
  console.log("  -- req.url:", req.url)
  console.log("  -- req.method:", req.method)
  next()
  // res.send()
})

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

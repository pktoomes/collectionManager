const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()
const xmendal = require('./dal')

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'));

app.get('/', function(req, res){
  return xmendal.getAllXmen().then(function(xmenOn){
    res.render('list', {xmenOn})
    console.log(xmenOn);
  });
})
app.get('/singlexman/:id', function(req, res){
  return xmendal.getXman(req.params.id).then(function(xperson){
    console.log('xperson', xperson)
    res.render('singleXman', {xperson})
  })
})
app.get('/update/:id', function(req, res){
  return xmendal.getXman(req.params.id).then(function(xperson){
    res.render('update', {xperson})
  })
})
app.post('/updateXman', function(req, res){
    const xperson = req.body;
    console.log('update xperson', xperson);
    xmendal.updateXman(xperson);
    console.log('updated xperson', xperson);
    res.redirect('/')
})
app.get('/delete/:id', function(req, res){
  return xmendal.getXman(req.params.id).then(function(xperson){
    return xmendal.deleteXman(xperson).then(function(xperson){
     console.log('deleted', xperson);
     res.redirect('/')
     })
   })
})

app.get('/addxman', function(req, res){
  res.render('addXman')
})
app.post('/addXman', function(req, res){
    return xmendal.addXman(req.body).then(function(){
    console.log('new xperson', req.body);
    res.redirect('/')
    })
  })
app.set('port', 3000)
app.listen(3000,function(){
  console.log('app is running')
});

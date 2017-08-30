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

})
app.get('/addxman', function(req, res){
  res.render('addXman')
})
app.post('/addXman', function(req, res){
    return xmendal.addXman(req.body).then(function(){;
    console.log(xmendal.addXman(req.body));
    res.redirect('/');
    })
  })
app.set('port', 3000)
app.listen(3000,function(){
  console.log('app is running')
})

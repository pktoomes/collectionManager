const mongoose = require('mongoose');
const Xman = require('./model');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/Xmen', {
  useMongoClient: true
})

function getAllXmen(){
  return Xman.find().catch(function(err){
    console.log(err);
  });
}
function getXman(xmenId) {
	return Xman.findOne({ name: xmenId }).catch(function(err) {
		console.log(err);
	});
}

function addXman(newXmen){
  const Xperson = new Xman(newXmen)
  console.log('Xman', Xperson);
  Xperson.save(function(err){
    console.log(err)
  })
  return Promise.resolve('success')
}
module.exports={
  getAllXmen,
  addXman,
}

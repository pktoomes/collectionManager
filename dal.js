const mongoose = require('mongoose');
const Xman = require('./model');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/xmendb', {
  useMongoClient: true
})

function getAllXmen(){
  return Xman.find().catch(function(err){
    console.log(err);
  });
}
function getXman(xmenId) {
	return Xman.findOne({_id: xmenId }).catch(function(err) {
		console.log(err);
	});
}

function addXman(newXmen){
  const Xperson = new Xman({
    avatar: newXmen.avatar,
    real_name: newXmen.real_name,
    codename: newXmen.codename,
    team: newXmen.team,
    powers: newXmen.powers
  })
  console.log('Xman', Xperson);
  Xperson.save(function(err){
    console.log(err)
  })
  return Promise.resolve('success')
}

function deleteXman(xname){
  return Xman.deleteOne({_id: xname})
}

function updateXman(xMan){
  Xman.update({_id: xMan.id}, {$set:{
    avatar: xMan.avatar,
    real_name: xMan.real_name,
    codename: xMan.codename,
    team: xMan.team,
    powers: xMan.powers
      }
    },
    function(err, data){
			if (err) return handleError(err);
			console.log("Mongo data", data)
      }
  )
}

module.exports={
  getAllXmen,
  getXman,
  addXman,
  deleteXman,
  updateXman
}

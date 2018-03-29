'use strict';

module.exports = function(Cat) {
  Cat.findID= function(name, cb){
    Cat.findOne({where:{name: name}},function(err, result){
      cb(null,result.address)
    })
  }
  Cat.remoteMethod('findID',{
    accepts:{arg:'name', type:'string', required:true},
    returns:{arg:'result', type:'any'}
  });
};

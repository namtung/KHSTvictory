'use strict';
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://namtung:aimabiet999@ds125198.mlab.com:25198/scienceclub";

module.exports = function(Lhpsc) {
  Lhpsc.updateCard= function(input, cb){
    MongoClient.connect(url, function(err, db) {
      var dbO = db.db("scienceclub");
      var inputId=input[0].id;
      var data =input[1];
      var old={_id: ObjectId(inputId)};
      var current={$set : data};
      dbO.collection("lhpsc").updateOne(old,current, function(err, result) {
        cb(null, input)
        db.close();
      });
    });
  }
  Lhpsc.updateContent= function(input, cb){
    MongoClient.connect(url, function(err, db) {
      var dbO = db.db("scienceclub");
      var inputId=input[0].id;
      var dateGet= input[0].date;
      var data =input[1];
      var old={_id: ObjectId(inputId), "core.date": dateGet};
      var current={$set : { "core.$": data}};
      dbO.collection("lhpsc").updateOne(old,current, function(err, result) {
        cb(null, input)
        db.close();
      });
    });
  }
  Lhpsc.addContent= function(input, cb){
    MongoClient.connect(url, function(err, db) {
      var dbO = db.db("scienceclub");
      var inputId=input[0].id;
      var data =input[1];
      var old={_id: ObjectId(inputId)};
      var current={$addToSet : {core: data}};
      dbO.collection("lhpsc").updateOne(old,current, function(err, result) {
        cb(null, "Done")
        db.close();
      });
    });
  }

  Lhpsc.removeContent= function(input, cb){
    MongoClient.connect(url, function(err, db) {
      var dbO = db.db("scienceclub");
      var old={_id: ObjectId(input.id)};
      var current={$pull : {core: {date: input.date}}};
      dbO.collection("lhpsc").updateOne(old,current, function(err, result) {
        cb(null, "Done")
        db.close();
      });
    });
  }

  Lhpsc.fetchCard=function(msg, cb){
    let filter= {fields :{id:true,title: true, content:true, imgURL:true,author:true}};
    Lhpsc.find(filter, function(err,result){
      cb(null, result)
    })
  }

  Lhpsc.fetchContent=function(id, cb){
    console.log(id);
    let filter= {fields :{id:true,author:true, core: true}};
    Lhpsc.findById(id,filter, function(err,result){
      cb(null, result)
    })
  }


  Lhpsc.remoteMethod('updateCard',{
    accepts:{arg:'input', type:'any'},
    returns:{arg:'result', type:'string'},
  });
  Lhpsc.remoteMethod('updateContent',{
    accepts:{arg:'input', type:'any'},
    returns:{arg:'result', type:'string'},
  });

  Lhpsc.remoteMethod('fetchCard',{
    accepts:{arg:'input', type:'any'},
    returns:{arg:'result', type:'array'},
    http:{verb:'get'}
  });
  Lhpsc.remoteMethod('fetchContent',{
    accepts:{arg:'id', type:'any'},
    returns:{arg:'result', type:'array'},
  });

  Lhpsc.remoteMethod('addContent',{
    accepts:{arg:'input', type:'array',},
    returns:{arg:'result', type:'string'},
  });

  Lhpsc.remoteMethod('removeContent',{
    accepts:{arg:'input', type:'any',},
    returns:{arg:'result', type:'string'},
    http:{verb:'put'}
  });
};
// [{"id": "5a8351061c8f9f0010921e56", "title":"test2" }, {"title": "Test2",
//         "head": "Test2",
//         "body": "test2",
//         "date": 1518977452875,
//         "imgURL": "Test2",
//         "author": "Test2"}]

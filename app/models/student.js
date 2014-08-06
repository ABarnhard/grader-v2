'use strict';

var _ = require('lodash');
var Mongo = require('mongodb');

function Student(obj){
  this.name = obj.name;
  this.color = obj.color;
  this.tests = [];
}

Object.defineProperty(Student, 'collection', {
  get: function(){return global.mongodb.collection('students');}
});

Student.prototype.avg = function(){
  if(!this.tests.length){return 0;}

  var sum = this.tests.reduce(function(a,b){return a+b;});
  return sum/this.tests.length;
};

Student.prototype.letter = function(){
  if(!this.tests.length){return 'N/A';}

  var avg = this.avg();
  if(avg < 60){
    return 'F';
  }else if(avg < 70){
    return 'D';
  }else if(avg < 80){
    return 'C';
  }else if(avg < 90){
    return 'B';
  }else{
    return 'A';
  }
};

Student.prototype.onHonorRoll = function(){
  if(!this.tests.length){return false;}
  return this.avg() > 95;
};

Student.prototype.isSuspended = function(){
  if(!this.tests.length){return false;}
  var numFailed = this.tests.reduce(function(a, b){return a += (b < 60) ? 1 : 0;}, 0);
  return numFailed >= 3;
};

Student.prototype.save = function(cb){
  Student.collection.save(this, cb);
};

Student.prototype.addTest = function(obj, cb){
  this.tests.push(obj.score * 1);
  this.save(cb);
};

Student.findAll = function(cb){
  Student.collection.find().toArray(function(err, objects){
    var students = objects.map(function(obj){return reProto(obj);});
    cb(students);
  });
};

Student.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Student.collection.findOne({_id:id}, function(err, object){
    cb(reProto(object));
  });
};

module.exports = Student;

// Helper Functions

function reProto(obj){
  return _.create(Student.prototype, obj);
}


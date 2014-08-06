'use strict';

var _ = require('lodash');

function Student(obj){
  this.name = obj.name;
  this.color = obj.color;
  this.tests = [];
  this.onHonorRoll = checkHonorRoll(this);
  this.isSuspended = checkSuspended(this);
}

Student.prototype.avg = function(){
  if(!this.tests.length){return 0;}

  var sum = this.tests.reduce(function(a,b){return a+b;});
  return sum/this.tests.length;

};

module.exports = Student;

// Helper Functions

function reProto(obj){
  return _.create(Student.prototype, obj);
}

function checkHonorRoll(me){
  if(!me.tests.length){return false;}

}

function checkSuspended(me){
  if(!me.tests.length){return false;}

}

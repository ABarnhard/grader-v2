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

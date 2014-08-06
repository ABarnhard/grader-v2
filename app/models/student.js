'use strict';

function Student(obj){
  this.name = obj.name;
  this.color = obj.color;
  this.tests = [];
  this.onHonorRoll = checkHonorRoll(this);
  this.isSuspended = checkSuspended(this);
}


module.exports = Student;

// Helper Functions

function checkHonorRoll(me){
  if(!me.tests.length){return false;}

}

function checkSuspended(me){
  if(!me.tests.length){return false;}

}

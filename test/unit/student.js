/* jshint expr: true */
/* global describe, it */
'use strict';

var expect = require('chai').expect;
var Student = require('../../app/models/student');

var s1;

describe('Student', function(){
  describe('Constructor', function(){
    it('should create a new instance of Student with properties', function(){
      s1 = new Student({name:'Jim Jones', color:'blue'});
      expect(s1).to.be.instanceof(Student);
      expect(s1.name).to.equal('Jim Jones');
      expect(s1.color).to.equal('blue');
      expect(s1.tests).to.have.length(0);
      expect(s1.onHonorRoll).to.be.false;
      expect(s1.isSuspended).to.be.false;
    });
  });
});

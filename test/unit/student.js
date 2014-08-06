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
  describe('#avg', function(){
    it('should return the average for all tests taken', function(){
      s1 = new Student({name:'Jim Jones', color:'blue'});
      s1.tests = [95, 85, 75, 65, 55];
      expect(s1.avg()).to.be.closeTo(75, 0.1);
    });
  });
  describe('#letter', function(){
    it('should return A', function(){
      s1 = new Student({name:'Jim Jones', color:'blue'});
      s1.tests = [95];
      expect(s1.letter()).to.equal('A');
    });
    it('should return B', function(){
      s1 = new Student({name:'Jim Jones', color:'blue'});
      s1.tests = [85];
      expect(s1.letter()).to.equal('B');
    });
    it('should return C', function(){
      s1 = new Student({name:'Jim Jones', color:'blue'});
      s1.tests = [75];
      expect(s1.letter()).to.equal('C');
    });
    it('should return D', function(){
      s1 = new Student({name:'Jim Jones', color:'blue'});
      s1.tests = [65];
      expect(s1.letter()).to.equal('D');
    });
    it('should return F', function(){
      s1 = new Student({name:'Jim Jones', color:'blue'});
      s1.tests = [55];
      expect(s1.letter()).to.equal('F');
    });
  });

});

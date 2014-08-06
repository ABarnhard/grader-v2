/* jshint expr: true */
/* global describe, it, before, beforeEach */
'use strict';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var connect = require('../../app/lib/mongodb');
var Student = require('../../app/models/student');

var s1, s2, s3;

describe('Student', function(){
  before(function(done){
    connect('grader2-test', function(){
      done();
    });
  });
  beforeEach(function(done){
    Student.collection.remove(function(){
      s1 = new Student({name:'Jim Jones', color:'blue'});
      s2 = new Student({name:'Bob Boberson', color:'red'});
      s3 = new Student({name:'Tom Tomson', color:'orange'});

      s1.save(function(){
        s2.save(function(){
          s3.save(function(){
            done();
          });
        });
      });
    });
  });
  describe('Constructor', function(){
    it('should create a new instance of Student with properties', function(){
      expect(s1).to.be.instanceof(Student);
      expect(s1.name).to.equal('Jim Jones');
      expect(s1.color).to.equal('blue');
      expect(s1.tests).to.have.length(0);
    });
  });
  describe('#avg', function(){
    it('should return the average for all tests taken', function(){
      s1.tests = [95, 85, 75, 65, 55];
      expect(s1.avg()).to.be.closeTo(75, 0.1);
    });
  });
  describe('#letter', function(){
    it('should return A', function(){
      s1.tests = [95];
      expect(s1.letter()).to.equal('A');
    });
    it('should return B', function(){
      s1.tests = [85];
      expect(s1.letter()).to.equal('B');
    });
    it('should return C', function(){
      s1.tests = [75];
      expect(s1.letter()).to.equal('C');
    });
    it('should return D', function(){
      s1.tests = [65];
      expect(s1.letter()).to.equal('D');
    });
    it('should return F', function(){
      s1.tests = [55];
      expect(s1.letter()).to.equal('F');
    });
  });
  describe('#onHonorRoll', function(){
    it('should be true if avg is above 95%', function(){
      s1.tests = [98];
      expect(s1.onHonorRoll()).to.be.true;
    });
    it('should be false if avg is below 95%', function(){
      s1.tests = [90];
      expect(s1.onHonorRoll()).to.be.false;
    });
  });
  describe('#isSuspended', function(){
    it('should be true if 3 tests have been failed', function(){
      s1.tests = [98, 44, 55, 22, 80];
      expect(s1.isSuspended()).to.be.true;
    });
    it('should be false if less than 3 tests have been failed', function(){
      s1.tests = [90, 55, 88, 95];
      expect(s1.isSuspended()).to.be.false;
    });
  });
  describe('#save', function(){
    it('should save Student into database', function(done){
      var bob = new Student({name:'Bob', color:'green'});
      bob.save(function(){
        expect(bob._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('#addTest', function(){
    it('add test score to record in database', function(done){
      s1.addTest({score:'90.3'}, function(){
        Student.findById(s1._id.toString(), function(student){
          expect(student.tests).to.have.length(1);
          expect(student.tests[0]).to.be.closeTo(90.3, 0.1);
          done();
        });
      });
    });
  });
  describe('#getColor', function(){
    it('should return blue for numbers 90-100', function(){
      expect(s1.getColor(95)).to.equal('blue');
    });
    it('should return green for numbers 80-89', function(){
      expect(s1.getColor(85)).to.equal('green');
    });
    it('should return orange for numbers 70-79', function(){
      expect(s1.getColor(75)).to.equal('orange');
    });
    it('should return red for numbers 60-69', function(){
      expect(s1.getColor(65)).to.equal('red');
    });
    it('should return brown for numbers less than 60', function(){
      expect(s1.getColor(55)).to.equal('brown');
    });
  });
  describe('.findAll', function(){
    it('should find all students in database', function(done){
      Student.findAll(function(students){
        expect(students).to.have.length(3);
        expect(students[0]).to.respondTo('avg');
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should return a student record by it\'s ID from database', function(done){
      Student.findById(s1._id.toString(), function(student){
        expect(student).to.eql(s1);
        expect(student).to.respondTo('avg');
        done();
      });
    });
  });
});

'use strict';

var Student = require('../models/student');

exports.index = function(req, res){
  Student.findAll(function(students){
    res.render('students/index', {students:students});
  });
};

exports.show = function(req, res){
  Student.findById(req.params.id, function(student){
    res.render('students/show', {student:student});
  });
};

exports.addTest = function(req, res){
  res.render('students/addtest', {id:req.params.id});
};

exports.init = function(req, res){
  res.render('students/new');
};

exports.create = function(req, res){
  var s = new Student(req.body);
  s.save(function(){
    res.redirect('/students');
  });
};

exports.update = function(req, res){
  Student.findById(req.params.id, function(student){
    student.addTest(req.body, function(){
      res.redirect('/students/' + req.params.id);
    });
  });
};

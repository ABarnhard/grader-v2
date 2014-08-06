grader-v2
=========
### Code Badges
[![Build Status](https://travis-ci.org/ABarnhard/grader-v2.svg)](https://travis-ci.org/ABarnhard/grader-v2)
[![Coverage Status](https://coveralls.io/repos/ABarnhard/grader-v2/badge.png)](https://coveralls.io/r/ABarnhard/grader-v2)

### About
Grader-v2 is a simple LMS system for tracking student performance
### Models
```
Student
--------------
name
color
tests
--------------
.collection
--------------
#onHonorRoll
#isSuspended
#avg
#letter
#save
#addTest
#getColor
--------------
.findAll
.findById
```
### Features
- Object Oriented
- MVC
- TDD
- Mocha
- MongoDB
- Jade
- Express

### Running Tests
```bash
$ npm install
$ npm test
```

### Contributors
- [Adam Barnhard](https://github.com/abarnhard)

### License
[MIT](LICENSE)

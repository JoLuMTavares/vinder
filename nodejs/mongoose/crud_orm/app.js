var mongoose=require('mongoose');
var Student=require('./studentmodel');
const express=require('express');
const bodyParser = require('body-parser');


const app=express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/user_mongoose');
app.get('/',function(req,res){

  res.json({
              info: 'student crud api'
          });

});

//Task
//Create a CRUD API for creating, updating, deleting and reading student info.productmodel

//POST - Create
//PUT - update
//DELETE - delete
//GET - read
//PUT, DELETE and GET expect a student ID.

//add a new student
app.post('/student',function(req,res){

  //here we take req.body from the postman for the new student.
  console.log(req.body);

  var newStudent= new Student(req.body);

  newStudent.save(function(err){
      if(err)
          return res.send(err);

      console.log('user ' + req.body.name + ' has been saved successfully');
      return res.send({ newStudent: req.body});
  });

});

//get or load student info by id.
app.get('/student/:id',function(req,res){

  //read statement
  //req.params.id which we will pass to postman
  //http://localhost:3000/student/5b9a2baab3edac3ef5b928ec
  Student.findById(req.params.id,function(err,student){

      if(!student)
          return res.send({ err: 'student not found'});

      console.log(student);
      return res.send(student);

  });
});

//update statement
//app.put('/student/:id',)

app.put("/student/:id", function (req, res) {
   
    Student.findById(req.params.id, function (err, student) {
        
        if (!student)
            return res.send(err , "Student not found!");


        for (key in req.body) 
            student[key] = req.body[key];

        
        student.save(function(err){
            if(err)
                return res.send(err);
        
            console.log('User ' + req.body.name + ' has been successfully saved.');
            return res.send(student);
        });

    });

});

app.delete("/student/:id", function (req, res) {
   
    // First find student by id which we have passed through postman
    Student.findById(req.params.id, function (err, student) {
        
        if (!student)
            return res.send(err , "Student not found!");

        student.remove(function(err){
            if(err)
                return res.send(err);
        
            console.log('User ' + req.body.name + ' has been successfully removed.');
            return res.send(student);
        });
    });
});


app.listen(3000,function(){
  console.log('app listening on port 3000');
});
const { 
  login,
  getStudent,
  getNews,
  getLecturers,
  getLecturersList,
  getSchedule,
  getSession,
  getFinances
} = require("./databaseQueries")
const mysql      = require('mysql');

var databaseConnection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  database : 'isaps-bd',
  port: 3308
});

databaseConnection.connect((error) => {
  if(error){
      console.log('Database connection error');
      console.log("ERROR: ", error)
  }else{
      console.log('Database connection successful');
  }
});

const express = require('express')
const app = express()
const port = 3000

const serverError = "Server error"

app.use('/login/email=:email&password=:password', (req, res) => {
  login(databaseConnection, req.params).then((result) => {
    console.log(result)
    res.send(result);
  }).catch((err) => {
    console.log(err)
    res.status(500).end(serverError);
  });
});

app.get('/student/id=:id', (req, res) => {
  getStudent(databaseConnection, req.params).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err)
    res.status(500).end(serverError);
  });
})

app.get('/news', (req, res) => {
  getNews(databaseConnection).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err)
    res.status(500).end(serverError);
  });
})

app.get('/lecturers', (req, res) => {
  getLecturers(databaseConnection).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err)
    res.status(500).end(serverError);
  });
})

app.get('/lecturerslist', (req, res) => {
  getLecturersList(databaseConnection).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err)
    res.status(500).end(serverError);
  });
})

app.get('/schedule/groupId=:groupId', (req, res) => {
  getSchedule(databaseConnection, req.params).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err)
    res.status(500).end(serverError);
  });
})

app.get('/session/studentId=:studentId', (req, res) => {
  getSession(databaseConnection, req.params).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err)
    res.status(500).end(serverError);
  });
})

app.get('/finance/studentId=:studentId', (req, res) => {
  getFinances(databaseConnection, req.params).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err)
    res.status(500).end(serverError);
  });
})

app.listen(port, () => console.log(`iSAPS listening on port ${port}!`))

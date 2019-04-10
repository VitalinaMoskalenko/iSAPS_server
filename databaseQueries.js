function login(databaseConnection, params) {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM student WHERE student_email="${params.email}" AND password="${params.password}";`;
      return databaseConnection.query(queryString, (err, res) => {
        if(err){
          reject(err);
        }
        return resolve(res[0]);
      });
    });
  }

function getStudent(databaseConnection, params) {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT * FROM student WHERE student_id=${params.id};`;
    return databaseConnection.query(queryString, (err, res) => {
      if(err){
        reject(err);
      }
      return resolve(res[0]);
    });
  });
}

function getNews(databaseConnection) {
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM news ORDER BY news.date DESC;";
    return databaseConnection.query(queryString, (err, res) => {
      if(err){
        reject(err);
      }
      return resolve(res);
    });
  });
}

function getLecturersList (databaseConnection){
  return new Promise((resolve, reject) => {
    const queryString = "SELECT DISTINCT CONCAT(  lecturers_first_name, ' ',  lecturers_last_name ) as full_name, lecturers_title FROM `isaps-bd`.lecturers ORDER BY full_name ASC;";
    return databaseConnection.query(queryString, (err, res) => {
      if(err){
        reject(err);
      }
      return resolve(res);
    });
  });
}

function getLecturers(databaseConnection) {
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM lecturers ORDER BY lecturers.lecturers_start_date;";
    return databaseConnection.query(queryString, (err, res) => {
      if(err){
        reject(err);
      }
      return resolve(res);
    });
  });
}

function getSchedule(databaseConnection, params) {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT * FROM schedule JOIN lecturers ON schedule.lectorers_id = lecturers.lecturers_id WHERE schedule.group_id = ${params.groupId} ORDER BY schedule.time_start;`;
    return databaseConnection.query(queryString, (err, res) => {
      if(err){
        reject(err);
      }
      return resolve(res);
    });
  });
}

function getSession(databaseConnection, params) {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT * FROM session JOIN lecturers ON session.lecturers_id = lecturers.lecturers_id WHERE session.student_id = ${params.studentId} ORDER BY session.course_date;`;
    return databaseConnection.query(queryString, (err, res) => {
      if(err){
        reject(err);
      }
      return resolve(res);
    });
  });
}

function getFinances(databaseConnection, params) {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT * FROM finance WHERE student_id = ${params.studentId} ORDER BY finance.payment_date;`;
    return databaseConnection.query(queryString, (err, res) => {
      if(err){
        reject(err);
      }
      return resolve(res);
    });
  });
}

module.exports = { 
  login,
  getStudent,
  getNews,
  getLecturers, 
  getLecturersList,
  getSchedule,
  getSession,
  getFinances 
}
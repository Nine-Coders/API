const { Client } = require('pg')
const connectionString = require('../config.js').connectionString

const client = new Client({
  connectionString,
})
client.connect(err => {
  if (err) {
    console.log('connection error: ', err.stack);
  } else {
    console.log('connected to pg');
  }
})

module.exports = {
  getAllTopics: (cb) => {
    let queryString = 'SELECT * FROM study.topics';
    client.query(queryString, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },
  getAllRooms: (topicId, cb) => {
    let queryString = 'SELECT * FROM study.rooms WHERE topic_id=$1';
    let queryParams = [topicId];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data.rows);
      }
    });
  },
  getAllMessages: (roomId, cb) => {
    let queryString = 'SELECT * FROM study.messages WHERE room_id=$1';
    let queryParams = [roomId];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data.rows);
      }
    });
  },
  getAllUsers: (roomId, cb) => {
    let queryString = 'SELECT user_ids FROM study.rooms WHERE id=$1';
    let queryParams = [roomId];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        // console.log(data.rows[0].user_ids);
        let altQueryString = 'SELECT * FROM study.users WHERE id=ANY(ARRAY$1)';
        let altQueryParams = [data.rows[0].user_ids];
        client.query(altQueryString, altQueryParams, (err, userData) => {
          if (err) {
            console.log(err)
            cb(err)
          } else {
            cb(null, userData.rows)
          }
        })
        // cb(null, data.rows);
      }
    });
  },
  postMessage: (messageData, cb) => {
    let queryString = '?';
    let queryParams = [...messageData];
    client.query(queryString, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },
  createUser: (userData, cb) => {
    let queryString = '?';
    let queryParams = [...userData];
    client.query(queryString, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },
  postFile: (fileData, cb) => {
    let queryString = '?';
    let queryParams = [...fileData];
    client.query(queryString, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  }
}
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
    let queryString = 'SELECT array_agg(user_id::integer) FROM study."users/rooms" WHERE room_id=$1';
    let queryParams = [roomId];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        // console.log('data: ', data.rows[0].array_agg); // [ 1, 4 ]
        let usersString = JSON.stringify(data.rows[0].array_agg)
        let altQueryString = `SELECT * FROM study.users WHERE id=ANY(ARRAY${usersString})`;
        client.query(altQueryString, (err, userData) => {
          if (err) {
            console.log(err)
            cb(err)
          } else {
            cb(null, userData.rows)
          }
        })
      }
    });
  },
  postMessage: (roomId, messageData, cb) => {
    let queryString = 'INSERT INTO study.messages (room_id, user_id, body) VALUES($1, $2, $3)';
    let queryParams = [roomId, messageData.user_id, messageData.body];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },
  createUser: (userData, cb) => {
    let queryString = 'INSERT INTO study.users (username, avatar) VALUES($1, $2)';
    let queryParams = [userData.username, userData.avatar];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },
  createRoom: (topicId, roomData, cb) => {
    let queryString = 'INSERT INTO study.rooms (name, topic_id, thumbnail, max_users, is_private, admin_id) VALUES($1, $2, $3, $4, $5, $6)';
    let queryParams = [roomData.name, topicId, roomData.thumbnail, roomData.max_users, roomData.is_private, roomData.admin_id];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },
  addUserToRoom: (data, cb) => {
    let queryString = 'INSERT INTO study."users/rooms" (user_id, room_id) VALUES($1, $2)';
    let queryParams = [data.user_id, data.room_id];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },
  postEvent: (eventData, cb) => {
    let queryString = 'INSERT INTO study.events (name, description, user_id, room_id, event_date) VALUES($1, $2, $3, $4, $5)';
    let queryParams = [eventData.name, eventData.description, eventData.user_id, eventData.room_id, eventData.event_date];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },
  getEvents: (roomId, cb) => {
    let queryString = 'SELECT * FROM study.events WHERE room_id=$1';
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
  toggleArchiveRoom: (roomId, cb) => {
    let queryString = 'UPDATE study.rooms SET is_archived = NOT is_archived WHERE id=$1';
    let queryParams = [roomId.room_id];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data.rows);
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
  },

}
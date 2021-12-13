const { Client } = require('pg')
const crypto = require('crypto');
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
        cb(null, data.rows);
      }
    });
  },
  getAllRoomsForTopic: (topicId, cb) => {
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
  getAllRooms: (cb) => {
    let queryString = 'SELECT * FROM study.rooms';
    client.query(queryString, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data.rows);
      }
    });
  },
  findRoom: (searchTerm, cb) => {
    let queryString = `SELECT * FROM study.rooms WHERE name LIKE '%${searchTerm}%'`;
    //let queryParams = [searchTerm];
    client.query(queryString, (err, data) => {
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
  getRoomsForUser: (userId, cb) => {
    let queryString = `
    SELECT study.rooms.*
    FROM study.rooms
    LEFT JOIN study."users/rooms"
    ON study.rooms.id = study."users/rooms".room_id
    WHERE study."users/rooms".user_id=$1`;
    let queryParams = [userId];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data.rows);
      }
    });
  },
  getUser: (user, cb) => {
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
        let altQueryString = `SELECT id, first_name, last_name, email, avatar, created_at FROM study.users WHERE id=ANY(ARRAY${usersString})`;
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
    if (userData.password || userData.googleId) {
      const salt = crypto.randomBytes(16).toString('hex');
      crypto.scrypt((userData.password || userData.googleId), salt, 64, (err, derivedKey) => {
        if (err) {
          cb(err);
        } else {
          let encrypted = salt + ':' + derivedKey.toString('hex');
          let queryString;
          if (userData.password) {
            queryString = 'INSERT INTO study.users (first_name, last_name, email, avatar, password) VALUES($1, $2, $3, $4, $5)';
          } else {
            queryString = 'INSERT INTO study.users (first_name, last_name, email, avatar, google_id) VALUES($1, $2, $3, $4, $5)';
          }
          let queryParams = [userData.first_name, userData.last_name, userData.email, userData.avatar, encrypted];
          client.query(queryString, queryParams, (err, data) => {
            if (err) {
              console.log(err);
              cb(err);
            } else {
              cb(null, data);
            }
          });
        }
      })
    } else {
      cb('password or googleId was not provided')
    }
  },
  authUser: (authData, cb) => {
    if (authData.password || authData.googleId) {
      let encryptedQuery;
      if (authData.password) {
        encryptedQuery = 'SELECT id, first_name, last_name, email, avatar, created_at, password  FROM study.users WHERE email=$1'
      } else {
        encryptedQuery = 'SELECT id, first_name, last_name, email, avatar, created_at, google_id FROM study.users WHERE email=$1'
      }
      let queryParams = [authData.email];
      client.query(encryptedQuery, queryParams, (err, data) => {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          if (data.rows[0]) {
            const [salt, key] = (data.rows[0].password || data.rows[0].google_id).split(":");
            crypto.scrypt((authData.password || authData.googleId), salt, 64, (err, derivedKey) => {
              if (err) {
                cb(err);
              } else {
                if (key === derivedKey.toString('hex')) {
                  delete data.rows[0].password;
                  delete data.rows[0].google_id;
                  cb(null, data.rows[0])
                } else {
                  cb(null, false);
                }
              }
            })
          } else {
            cb(null, false);
          }
        }
      });
    }
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
  getGoals: (roomId, cb) => {
    let queryString = `SELECT study.goals.*,
    array_agg(study."users/goals".user_id::integer)
    AS user_ids
    FROM study.goals
    LEFT JOIN study."users/goals"
    ON study.goals.id = study."users/goals".goal_id
    WHERE study.goals.room_id=$1
    GROUP BY study.goals.id`;
    let queryParams = [roomId];
    client.query(queryString, queryParams, (err, goalsData) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, goalsData.rows)
      }
    });
  },
  postGoal: (roomId, goalData, cb) => {
    if (!goalData.goal_date) { delete goalData.goal_date };
    let queryString = 'INSERT INTO study.goals (name, description, goal_date, user_id, room_id) VALUES($1, $2, $3, $4, $5)';
    let queryParams = [goalData.name, goalData.description, goalData.goal_date, goalData.user_id, roomId];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },
  addUserToGoal: (data, cb) => {
    let queryString = 'INSERT INTO study."users/goals" (user_id, goal_id) VALUES($1, $2)';
    let queryParams = [data.user_id, data.goal_id];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },
  getAllUsersForGoal: (goalId, cb) => {
    let queryString = 'SELECT * FROM study."users/goals" WHERE goal_id=$1';
    let queryParams = [goalId];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data.rows);
      }
    });
  },
  getFiles: (roomId, cb) => {
    let queryString = 'SELECT * FROM study.files WHERE room_id=$1';
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
  postFile: (roomId, fileData, cb) => {
    let queryString = 'INSERT INTO study.files (url, name, room_id, user_id) VALUES($1, $2, $3, $4)';
    let queryParams = [fileData.url, fileData.name, roomId, fileData.user_id];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },
  deleteFile: (fileId, cb) => {
    let queryString = 'DELETE FROM study.files WHERE id=$1';
    let queryParams = [fileId];
    client.query(queryString, queryParams, (err, data) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },

}
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const db = require('./controller.js')
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*******Get APIs*******/

app.get('/loaderio-b1411d2df4f27707436a5bf39c3ad836', (req, res) => {
  res.send('loaderio-b1411d2df4f27707436a5bf39c3ad836');
})

app.get('/topics', (req, res) => {
  db.getAllTopics((err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/topic/:topic_id/rooms', (req, res) => {
  db.getAllRoomsForTopic(req.params.topic_id, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/rooms', (req, res) => {
  db.getAllRooms((err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/rooms/:room_id/messages', (req, res) => {
  db.getAllMessages(req.params.room_id, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/rooms/:room_id/users', (req, res) => {
  db.getAllUsers(req.params.room_id, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})


app.get('/rooms/:room_id/events', (req, res) => {
  db.getEvents(req.params.room_id, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/rooms/:room_id/goals', (req, res) => {
  db.getGoals(req.params.room_id, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/rooms/:room_id/files', (req, res) => {
  db.getFiles(req.params.room_id, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/goals/:goal_id', (req, res) => {
  db.getAllUsersForGoal(req.params.goal_id, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/user/:user_id/rooms', (req, res) => {
  db.getRoomsForUser(req.params.user_id, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/room/:room_id', (req, res) => {
  db.getRoomDetails(req.params.room_id, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

/*******Post APIs*******/

app.post('/rooms/:room_id/messages', (req, res) => {
  db.postMessage(req.params.room_id, req.body, (err, response) => {
    if (err) {
      if(err.code === '23503') {
        res.status(404).send(err);
      } else {
        res.status(400).send(err);
      }
    } else {
      res.status(201).send(response);
    }
  })
})

app.post('/users/create', (req, res) => {
  db.createUser(req.body, (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(response);
    }
  })
})

app.post('/users/auth', (req, res) => {
  db.authUser(req.body, (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(response);
    }
  })
})

app.post('/:topic_id/rooms/create', (req, res) => {
  db.createRoom(req.params.topic_id, req.body, (err1, response1) => {
    if (err1) {
      if (err1.code === '23503') {
        res.status(404).send(err1)
      } else {
        res.status(400).send(err1.detail)
      }
    } else {
      db.addUserToRoom({user_id: req.body.admin_id, room_id: response1.room_id}, (err2, response2) => {
        if (err2) {
          res.send(err2)
        } else {
          res.status(201).send(response1)
        }
      })
    }
  })
})

app.post('/addUserToRoom', (req, res) => {
  db.addUserToRoom(req.body, (err, response) => {
    if (err) {
      if (err.code === '23503') {
        res.status(404).send(err)
      } else {
        res.status(400).send(err)
      }
    } else {
      res.status(201).send(response)
    }
  })
})

app.post('/rooms/search', (req, res) => {
  db.findRoom(req.body.search_value, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
})

app.post('/rooms/create_event', (req, res) => {
  db.postEvent(req.body, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.status(201).send(response)
    }
  })
})

app.post('/rooms/:room_id/goals', (req, res) => {
  db.postGoal(req.params.room_id, req.body, (err, response) => {
    if (err) {
      if (err.code === '23503') {
        res.status(404).send(err)
      } else {
        res.status(400).send(err)
      }
    } else {
      res.status(201).send(response)
    }
  })
})

app.post('/rooms/:room_id/files', (req, res) => {
  db.postFile(req.params.room_id, req.body, (err, response) => {
    if (err) {
      if (err.code === '23503') {
        res.status(404).send(err)
      } else {
        res.status(400).send(err)
      }
    } else {
      res.status(201).send(response)
    }
  })
})

app.post('/goals/add-user', (req, res) => {
  db.addUserToGoal(req.body, (err, response) => {
    if (err) {
      if (err.code === '23503') {
        res.status(404).send(err)
      } else {
        res.status(400).send(err)
      }
    } else {
      res.status(201).send(response)
    }
  })
})

app.put('/toggle-archive', (req, res) => {
  db.toggleArchiveRoom(req.body, (err, response) => {
    if (err) {
      res.status(400).send(err)
    } else {
      if (response.rowCount === 0) {
        res.status(404).send('room not found')
      } else {
        res.send(response)
      }
    }
  })
})

app.delete('/files/:file_id/delete', (req, res) => {
  db.deleteFile(req.params.file_id, (err, response) => {
    if (err) {
      if (err.code === '23503') {
        res.status(404).send(err)
      } else {
        res.status(400).send(err)
      }
    } else {
      if (response.rowCount === 0) {
        res.status(404).send('file not found')
      } else {
        res.send(response)
      }
    }
  })
})

app.put('/rooms/new-invite-key', (req, res) => {
  db.changeInviteKey(req.body, (err, response) => {
    if (err) {
      res.status(400).send(err)
    } else {
      if (response.rowCount === 0) {
        res.status(404).send('room not found');
      } else {
        res.status(201).send(response)
      }
    }
  })
})

app.post('/rooms/check-invite-key', (req, res) => {
  db.addFromInviteKey(req.body, (err, response) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(response)
    }
  })
})

app.put('/goals/:goal_id', (req, res) => {
  db.updateGoal(req.params.goal_id, req.body, (err, response) => {
    if (err) {
      res.status(400).send(err)
    } else {
      if (response.rowCount === 0) {
        res.status(404).send(`goal with id ${req.params.goal_id} does not exist`);
      } else {
        res.status(201).send(response)
      }
    }
  })
})

app.delete('/goals/:goal_id', (req, res) => {
  db.deleteGoal(req.params.goal_id, (err, response) => {
    if (err) {
      res.status(500).send(err)
    } else {
      if (response.rowCount === 0) {
        res.status(404).send('goal not found')
      } else {
        res.send(response)
      }
    }
  })
})

app.put('/events/:event_id', (req, res) => {
  db.updateEvent(req.params.event_id, req.body, (err, response) => {
    if (err) {
      res.status(400).send(err)
    } else {
      if (response.rowCount === 0) {
        res.status(404).send(`event with id ${req.params.event_id} does not exist`);
      } else {
        res.status(201).send(response)
      }
    }
  })
})

app.delete('/events/:event_id', (req, res) => {
  db.deleteEvent(req.params.event_id, (err, response) => {
    if (err) {
      res.status(400).send(err)
    } else {
      if (response.rowCount === 0) {
        res.status(404).send(`event with id ${req.params.event_id} does not exist`);
      } else {
        res.status(201).send(response)
      }
    }
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
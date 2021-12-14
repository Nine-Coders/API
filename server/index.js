const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const db = require('./controller.js')

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
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/topic/:topic_id/rooms', (req, res) => {
  db.getAllRoomsForTopic(req.params.topic_id, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/rooms', (req, res) => {
  db.getAllRooms((err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/rooms/:room_id/messages', (req, res) => {
  db.getAllMessages(req.params.room_id, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/rooms/:room_id/users', (req, res) => {
  db.getAllUsers(req.params.room_id, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})


app.get('/rooms/:room_id/events', (req, res) => {
  db.getEvents(req.params.room_id, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/rooms/:room_id/goals', (req, res) => {
  db.getGoals(req.params.room_id, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/rooms/:room_id/files', (req, res) => {
  db.getFiles(req.params.room_id, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/goals/:goal_id', (req, res) => {
  db.getAllUsersForGoal(req.params.goal_id, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/user/:user_id/rooms', (req, res) => {
  db.getRoomsForUser(req.params.user_id, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

/*******Post APIs*******/

app.post('/rooms/:room_id/messages', (req, res) => {
  db.postMessage(req.params.room_id, req.body, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.post('/users/create', (req, res) => {
  db.createUser(req.body, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.post('/users/auth', (req, res) => {
  db.authUser(req.body, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.post('/:topic_id/rooms/create', (req, res) => {
  db.createRoom(req.params.topic_id, req.body, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.post('/addUserToRoom', (req, res) => {
  db.addUserToRoom(req.body, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.post('/rooms/search', (req, res) => {
  db.findRoom(req.body.search_value, (err, response) => {
    if (err) {
      res.send(err)
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
      res.send(response)
    }
  })
})

app.post('/rooms/:room_id/goals', (req, res) => {
  db.postGoal(req.params.room_id, req.body, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.post('/rooms/:room_id/files', (req, res) => {
  db.postFile(req.params.room_id, req.body, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.post('/goals/add-user', (req, res) => {
  db.addUserToGoal(req.body, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.put('/toggle-archive', (req, res) => {
  db.toggleArchiveRoom(req.body, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.put('/files/:file_id/delete', (req, res) => {
  db.deleteFile(req.params.file_id, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})


app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
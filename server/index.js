const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const db = require('./controller.js')

app.use(cors());
app.use(express.json());

app.get('/topics', (req, res) => {
  db.getAllTopics((err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/rooms/:topic_id', (req, res) => {
  db.getAllRooms(req.params.topic_id, (err, response) => {
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

app.post('/rooms/:topic_id/create', (req, res) => {
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

app.post('/rooms/create_event', (req, res) => {
  db.postEvent(req.body, (err, response) => {
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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
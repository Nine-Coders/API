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

app.get('/messages/:room_id', (req, res) => {
  db.getAllMessages(req.params.room_id, (err, response) => {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
  })
})

app.get('/users/:room_id', (req, res) => {
  db.getAllUsers(req.params.room_id, (err, response) => {
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
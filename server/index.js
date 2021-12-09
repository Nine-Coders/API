const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
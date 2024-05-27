const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;


app.use(bodyParser.json());

const notifications = [];

app.get('/', (req, res) => {
  res.send('Notification Service');
});


app.get('/notifications', (req, res) => {
  res.json(notifications);
});


app.post('/notifications', (req, res) => {
  const { title, message } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: 'Title and message are required' });
  }

  const notification = {
    id: uuidv4(),
    title,
    message,
    date: new Date()
  };

  notifications.push(notification);
  res.status(201).json(notification);
});


app.delete('/notifications/:id', (req, res) => {
  const { id } = req.params;
  const index = notifications.findIndex(notification => notification.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Notification not found' });
  }

  notifications.splice(index, 1);
  res.status(204).send();
});


app.listen(port, () => {
  console.log(`Notification service running at http://localhost:${port}`);
});
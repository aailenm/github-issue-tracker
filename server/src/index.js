const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const issues = [
    {
      score: 110,
      title: "something happened",
      number: "1234",
      relativeDateCreated: "7 days",
      opener: "martinflory",
      labels: [
        { name: "Unison", color: "yellow" },
        { name: "High Priority", color: "red" },
        { name: "Mobile", color: "blue" },
      ],
    },
    {
      score: 80,
      title: "another thing happened",
      number: "1235",
      relativeDateCreated: "5 days",
      opener: "martinflory",
      labels: [
        { name: "Unison", color: "yellow" },
        { name: "Low Priority", color: "green" },
        { name: "Mobile", color: "blue" },
      ],
    },
  ];

const users = ['aailenm', 'martinflory']

app.get('/api/issues', (req, res) => {
    const path = req.path;
    console.log("Request received: ", path);

    return res.send({ issues });
});

app.get('/api/users', (req, res) => {
    const path = req.path;
    console.log("Request received: ", path);

    return res.send({ users });
});

app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});

app.listen(4000, () => {
    console.log('Server up and running on port 4000');
});
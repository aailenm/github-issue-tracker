const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

app.use(bodyParser.json());

app.get('/api/orgs/:orgName', (req, res) => {
    const path = req.path;
    console.log("Request received: ", path);

    return res.send({ message: 'Not yet implemented' });
});

app.get('/api/orgs/:orgName/repos', (req, res) => {
    const path = req.path;
    console.log("Request received: ", path);

    return res.send({ message: 'Not yet implemented' });
});

app.get('/api/orgs/:orgName/repos/:reponame/users', (req, res) => {
    const path = req.path;
    console.log("Request received: ", path);

    return res.send({ message: 'Not yet implemented' });
});


app.get('/api/orgs/:orgName/repos/:reponame/issues', (req, res) => {
    const path = req.path;
    console.log("Request received: ", path);

    return res.send({ message: 'Not yet implemented' });
});

app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});

app.listen(4000, () => {
    console.log('Server up and running on port 4000');
});
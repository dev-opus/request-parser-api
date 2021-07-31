const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.get('/api/whoami', (req, res, next) => {
  const payload = {
    ipaddress: req.headers['x-forwarded-for'],
    language: req.headers['accept-language'],
    software: req.headers['user-agent'],
  };

  res.status(200).json(payload);
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: `4 oh 4! ${req.originalUrl} does not exist on this application`,
    available_routes: ['/api/whoami'],
  });
});

app.listen(port, () => {
  console.log('server started!', 'http://localhost:' + port + '/api/whoami');
});

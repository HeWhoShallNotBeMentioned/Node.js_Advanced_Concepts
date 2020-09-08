// for_PM2_clustering

// I'm a child, I'm going to act like va server and do nothing else
const express = require('express');
const crypto = require('crypto');
const app = express();

app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send('Hi there ---------------------');
  });
});

app.get('/fast', (req, res) => {
  res.send('This was fast! ');
});

app.listen(4500);

//Having this app run in 2 different browsers with single threading holds up the 2nd while the first completes.

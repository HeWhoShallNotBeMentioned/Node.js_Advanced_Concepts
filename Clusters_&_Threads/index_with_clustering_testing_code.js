process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

// From testing we have learned that limiting the # of children i.e.
// cluster.fork() should be limited to the number of physical CPU
// cores. Particularly for data processing intensive appliations. For
// non-data processig intensive apps, soft cores can be used.

// User Apache Bench for testing.  ex: ab -c 6 -n 6 localhost:4500/

// Is the file being executes in master mode?
if (cluster.isMaster) {
  console.log('cluster.isMaster ----  ', cluster.isMaster);
  // Cause index.js to be executed *again* but in child mode
  cluster.fork();
  cluster.fork();
} else {
  // I'm a child, I'm going to act like va server and do nothing else
  console.log('forked ----  ');
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
}
//Having this app run in 2 different browsers with single threading holds up the 2nd while the first completes.

// I'm a child, I'm going to act like va server and do nothing else
const express = require('express');
const crypto = require('crypto');
const app = express();
const Worker = require('worker_threads').Worker;

app.get('/', (req, res) => {
  // note the lack of using => arrow functions
  const worker = new Worker(function () {
    // When the app sends a message to the worker this is invoked
    this.onmessage = function () {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }
      // When the worker sends a message to the app this is invoked
      postMessage(counter);
    };
  });

  // when our worker sends a message back to the application, onmessage is called.
  worker.onmessage = function (myCounter) {
    console.log('worker.onmessage ----  ', myCounter);
  };

  // Send a message to our thread.
  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('This was fast! ');
});

app.listen(4500);

//Having this app run in 2 different browsers with single threading holds up the 2nd while the first completes.

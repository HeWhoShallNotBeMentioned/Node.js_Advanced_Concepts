const express = require('express');
const app = express();

function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

app.get('/', (req, res) => {
  doWork(5000);
  res.send('Hi there ---------------------');
});

app.listen(4500);

//Having this app run in 2 different browsers with single threading holds up the 2nd while the first completes.

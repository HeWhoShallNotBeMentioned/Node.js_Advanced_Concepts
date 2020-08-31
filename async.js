const https = require('https');

const start = Date.now();

function doRequest(num) {
  https
    .request('https://google.com', res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(Date.now() - start, 'num---   ', num);
      });
    })
    .end();
}

doRequest(1);
doRequest(2);
doRequest(3);
doRequest(4);
doRequest(5);
doRequest(6);
doRequest(7);

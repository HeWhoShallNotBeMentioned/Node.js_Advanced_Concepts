process.env.UV_THREADPOOL_SIZE = 4;

// Without the process.env the default threadpool size is 4.
// The 1st action returned will probably be doRequest because https operates outside the threadpool.
// Next will be the 1st Hash to the bcrypt function then the FS, and finally the other 3 hashes.
// This is because while the FS is called before the hashes it has a couple of async steps that allow the hashes to bump in.
// the fs slips in when a threads becomes available from the hashes completing. This fs is fast as the file is small and local not on a network.
// with 1 thread the fs is the last completed action.
// with 2 threeds the fis is the 2nd to last completed action.
// with 5 threads fs has its own thread and completes first.
// The https is not guarenteed to operate with the same speed relatice to the other servies as it is going via the internet and requiring a response from google.

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
  https
    .request('https://google.com', res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(Date.now() - start, 'Google---   ');
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash: ', Date.now() - start);
  });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS:', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();

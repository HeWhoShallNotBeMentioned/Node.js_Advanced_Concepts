const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
  console.log("I'M about to run a function.");
  console.log('this.getQuery in cache.js---', this.getFilter());
  console.log('collection name---', this.mongooseCollection.name);
  return exec.apply(this, arguments);
};

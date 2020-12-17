const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
  console.log("I'M about to run a function.");

  const key = Object.assign({}, this.getFilter(), {
    collection: this.mongooseCollection.name,
  });

  console.log('key---', key);
  return exec.apply(this, arguments);
};

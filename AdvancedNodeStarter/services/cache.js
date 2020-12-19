const mongoose = require('mongoose');
const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;

  this.hashKey = JSON.stringify(options.key || '');
  console.log('options.key -- ', options.key);
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getFilter(), {
      collection: this.mongooseCollection.name,
    })
  );
  console.log('key -- ', key);

  // See if we have a value for 'key' in redis
  const cacheValue = await client.hget(this.hashKey, key);
  console.log('cacheValue -- ', cacheValue);
  // If we do, return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    console.log('doc -- ', 'setting cache');
    return Array.isArray(doc) ? doc.map(d => this.model(d)) : this.model(doc);
  }

  // Otherwise, issue the query and store the result in redis.

  const result = await exec.apply(this, arguments);
  //console.log('result -- ', result);
  console.log('result---', result.validate);
  client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);
  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};

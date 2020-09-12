# AdvancedNodeStarter
Starting project for a course on Advanced Node @ Udemy

Redis in the node console
> const redis = require('redis')
undefined
> const redisURL = 'redis://127.0.0.1:6379'
undefined
> const client = redis.createClient(redisURL)
undefined
// set a basic key/value pair
> client.set("hi",'there')
// retrieve key/value pair via console.log
> client.get('hi', console.log)
// set blue/blau key/value pair under the hash of German
> client.hset('german', 'blue', 'blau')
// retrieve value of german hash blue
> client.hget('german', 'blue', console.log)
// set an object of values. Note stringify
> client.set('colors', JSON.stringify({red: 'rojo', blue: 'blau', orange: 'orange'}))
// returns colors as string
> client.get('colors', console.log)
// returns colors as object
> client.get('colors', (error, val) => console.log(JSON.parse(val)))

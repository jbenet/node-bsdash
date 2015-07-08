var through2 = require('through2')
var request = require('request')
var ndjson = require('ndjson')
var State = require('./state')

// TODO: dashboard on the web.

var x = module.exports = dash
x.createStream = createStream

function dash(api, parseCallback) {
  var stream = createStream(api)
  stream.pipe(through2.obj(function(state, _, cb) {
      parseCallback(null, state)
      cb()
  }))
}

// returns a stream with state object
function createStream(api) {
  var url = api + '/logs'
  var state = State()
  return request(url)
    .pipe(ndjson.parse())
    .pipe(through2.obj(function(doc, _, cb) {
      state.update(doc)
      cb(null, state)
    }))
}

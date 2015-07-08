#!/usr/bin/env node

var clivas = require('clivas')
var bsdash = require('./index')
var frame = 0
var usage = 'usage: bsdash [OPTIONS]'
var opt = require('optimist')
  .usage(usage)
  .describe('h', 'this help text')
  .describe('s', 'show only the state')
  .describe('l', 'rate limit draw (ms)')
  .describe('a', 'api url')
  .default('l', 25)
  .default('a', 'http://localhost:5001')
  .alias('h', 'help')
  .alias('s', 'state')
  .alias('l', 'ratelimit')
  .alias('a', 'api-url')

if (opt.argv.h) {
  process.stdout.write(opt.help())
  process.exit(0)
}

clivas.lines = function(lines) {
  lines = lines.split('\n')
  for (var i = 0; i < lines.length; i++) {
    clivas.line(lines[i])
  }
}

function main() {
  var api = opt.argv.a
  bsdash(api, function(err, state) {
    if (err) throw err
    print(state)
  })
}

var rateLimit = function(limit, func) {
  var last = null
  return function() {
    var now = new Date()
    if (last && (now - last) < limit)
      return new Error('too soon')

    last = now
    return func.apply(this, arguments)
  }
}

var print = rateLimit(opt.argv.l, function(state) {
  clivas.clear()
  clivas.flush()

  if (opt.argv.s) {
    clivas.lines(JSON.stringify(state, 0, 2))
  } else {
    printDash(state)
  }
  clivas.flush()
})

function printDash(s) {
  var size = 0
  frame++

  clivas.line("{magenta:*** IPFS Bitswap Dash ***}")

  size = objsize(s.activeGets)
  clivas.line("{green:Active Requests "+ size +": }")
  for (var k in s.activeGets) {
    clivas.line("    " + k)
  }

  size = objsize(s.provideWorkers)
  clivas.line("{green:Provide Workers "+ size +": }")
  for (var k in s.provideWorkers) {
    clivas.line("    worker " + k +": "+ s.provideWorkers[k])
  }

  size = objsize(s.taskWorkers)
  clivas.line("{green:Task Workers "+ size +": }")
  for (var k in s.taskWorkers) {
    clivas.line("    worker " + k +": "+ s.taskWorkers[k])
  }

  clivas.line("{green:Rebroadcast Worker: "+ s.rebroadcast +" }")
  clivas.line("{green:Provider Connector: "+ s.provConnector +" }")

  clivas.line("{80:}")
  clivas.line("events: " + s.events.bitswap +"/"+ s.events.total +
     " prints: " + frame + " (" + opt.argv.l + "ms delay)")
  if (s.error) {
    clivas.line("{red: " + s.error + "}")
  }
}

function objsize(obj) {
    var size = 0, key
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++
    }
    return size;
}

main()

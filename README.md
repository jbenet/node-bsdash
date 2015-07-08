# bsdash - dashboard for go-ipfs bitswap

This is a simple dashboard for bitswap in [go-ipfs](https://github.com/ipfs/go-ipfs/). It consumes the API's `/logs` route.

## `bsdash` in the terminal

![](http://g.recordit.co/FIh8HM7omw.gif)


Install it:
```
npm install -g bsdash
```

Run it:

```sh
# daemon should be running in the background
ipfs daemon &

# run bsdash
bsdash
```

You'll see something like this:

#### Note: open term window > 110 chars, or it will not draw properly.

(bug in clivas: see https://github.com/mafintosh/clivas/issues/2)

```
*** IPFS Bitswap Dash ***
Active Requests 0:
Provide Workers 4:
    worker 0: QmPtszRZEY9XDMss33v8rvyn29xVtPo2aLfJFUEjevrbfV
    worker 1: QmZ2mXY7RjgnAX3hMqyRPU6D3bc2NgcHBeo6jojy7Zby4k
    worker 2: QmQm3NTmeXZsojn3uG53Tqw5a8kjUWbwYk8R5C6q4SnBj9
    worker 3: QmcEUEwMNt4nfzxnz4CsJ6a2FtuVySj4RG6LNFp8GBChVt
Task Workers 8:
    worker 0: QmcH58rDCsmaLATkGbLB1KM1JEU9xmeB5D7gQzaMbRFUqH to QmSyjxWfaAmnaK3yBVZWUsfcPV4AFXEfJURuqLvHMxj3Lk
    worker 1: idle
    worker 2: QmUzFhUTN8odFZcMqmL3fRybgDvLzcrQL4CZt5EqS9Vex2 to QmSyjxWfaAmnaK3yBVZWUsfcPV4AFXEfJURuqLvHMxj3Lk
    worker 3: QmbiAJspmFbSTvPDjFE7BLfiDmqDizDmt3sjPoJk8fhhng to QmSyjxWfaAmnaK3yBVZWUsfcPV4AFXEfJURuqLvHMxj3Lk
    worker 4: QmdqYvoGKJQUA8MNCgqksWwKq17w1s8MBXGnNhiSnwAU8k to QmSyjxWfaAmnaK3yBVZWUsfcPV4AFXEfJURuqLvHMxj3Lk
    worker 5: QmeEow8iK8LmyXV4HXeznPouWrk6374oeGnXJcPqWHK7Pe to QmSyjxWfaAmnaK3yBVZWUsfcPV4AFXEfJURuqLvHMxj3Lk
    worker 6: QmQkYAkMo5GU4hNdAghBwwYdRfwVGHfcma129PB5XNPhqF to QmSyjxWfaAmnaK3yBVZWUsfcPV4AFXEfJURuqLvHMxj3Lk
    worker 7: QmRNLf435E3QRwundUUhKe1TUoRBHiZPoQZKdpVAYLYekv to QmSyjxWfaAmnaK3yBVZWUsfcPV4AFXEfJURuqLvHMxj3Lk
Rebroadcast Worker: idle
Provider Connector:

events: 1339/47203 prints: 3946 (25ms delay)
```

### Usage

```
usage: bsdash [OPTIONS]

Options:
  -h, --help       this help text
  -s, --state      show only the state
  -l, --ratelimit  rate limit draw (ms)  [default: 25]
  -a, --api-url    api url               [default: "http://localhost:5001"]
```

### `--api-url` - change the api location

If your IPFS API is elsewhere, run: http://localhost:5001

## `bsdash` lib module

If you want to make your own dashboard, use the the module to get the bitswap dashboard state from the api event logs.

```js
var bsdash = require('./index')
var api = "http://localhost:5001"
bsdash(api, function(err, state) {
  if (err) throw err

  console.log(state)
})
```





module.exports = State

function State() {
  var s = {
    events: { total: 0, bitswap: 0 },
    provideWorkers: {},
    rebroadcast: "",
    provConnector: "",
    activeGets: {},
    taskWorkers: {},
  }

  s.update = function(event) {
    updateState(s, event)
  }

  return s
}

function updateState(s, e) { // state, event
  s.events.total++

  var parts = e.event.split(".")
  if (parts[0] != "Bitswap")
    return // skip

  s.events.bitswap++

  switch (parts[1]) {
  case "ProvideWorker":
    s.provideWorkers[e.ID] = e.key || "idle"
    break
  case "Rebroadcast":
    s.rebroadcast = parts[2]
    break
  case "ProviderConnector":
    s.provConnector = (parts[2] == "Work") ? "active" : "idle"
    break
  case "GetBlockRequest":
    if (parts[2] == "Start") {
      s.activeGets[e.key] = true
    } else {
      delete s.activeGets[e.key]
    }
    break
  case "TaskWorker":
    if (parts[2] == "Loop") {
      s.taskWorkers[e.ID] = "idle"
    } else {
      s.taskWorkers[e.ID] = e.Block +" to "+ e.Target
    }
    break
  default:
    s.error = "unrecognized event: " + parts[1]
  }
}

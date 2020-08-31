// pseudo code for what the Node.js event loop looks like

// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running.
myFile.runContents();

function shouldContinue() {
  // Check 1: Any pending setTimeout, setInterval, setImmediate?
  // Check 2: Pending OS tasks? (Like server listening to port)
  // Check 3: Any pending long running operations? (Like fs module, threadpool)

  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
}

// Each running of body in while loop executing is called a tick
while (shouldContinue()) {
  // 1) Node looks at pendingTimers and sees if any callback functions are ready to be called. setTimeOut & setInterval
  // 2) Node looks at pendingOSTasks & pendingOperations and calls relevant callbacks.
  // 3) Pause Execution. Continue when...
  // - a new pendingOSTask is done
  // - a new pendingOperation is done
  // - a timer is about to complete
  // 4) Node looks at pendingTimers. Call any setImmediate
  // 5) Handle any 'close' events
}

// exit back to terminal

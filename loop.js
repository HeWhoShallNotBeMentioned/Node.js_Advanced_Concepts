// pseudo code for what the Node.js event loop looks like

// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

myFile.runContents();

function shouldContinue() {
  // Check 1: Any pending setTimeout, setInterval, setImmediate?
  // Check 2: Pending OS tasks? (Like server listening to port)
  // Check 3: Any pending long running operations? (Like fs module)

  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
}

// Each running of body in while loop executing is called a tick
while (shouldContinue()) {}

// exit back to terminal

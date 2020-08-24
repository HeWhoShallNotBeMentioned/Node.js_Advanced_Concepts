// pseudo code for what the Node.js event loop looks like

// node myFile.js

myFile.runContents();

function shouldContinue() {}

// Each running of body in while loop executing is called a tick
while (shouldContinue()) {}

// exit back to terminal

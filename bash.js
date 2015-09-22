var commands = require('./commands.js');

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
	// var cmd = data.toString().trim().split(" "); // remove the newline
	var cmdList = data.toString().trim().split(/\s*\|\s*/g)
	var firstCmd = cmdList[0].split(" ");
	var remainingList = cmdList.slice(1);

	var done = function (output) {
		while (remainingList.length > 0) {
			var nextCmd = remainingList.shift();
			commands[nextCmd](output, undefined, done);
		}
		
		process.stdout.write(output);
		process.stdout.write('\nprompt > ');
	}


  if (cmdList == "") process.stdout.write('prompt > ');
  else commands[firstCmd[0]](undefined, firstCmd.slice(1), done);

});


//asdf
//asdf
//dfgh
//dfgh
//dfgh
//dfgh
//erty
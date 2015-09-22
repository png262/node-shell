var fs = require('fs');
var request = require('request');

module.exports = {
	pwd : function (dummy1, dummy2, done) {
		done(process.cwd());
	},
	date: function (dummy1, dummy2, done) {
		done(String(new Date()));
	},
	ls: function(dummy1, dummy2, done) {
		fs.readdir('.', function(err, files) {
		  if (err) throw err;
		  done(files.join("\n"));
		})
	},
	echo: function(dummy, arg, done) {
		done(arg.join(" "));
	},
	cat: function(stdin, filename, done) {
		if (stdin == undefined) {
			var filePath = filename.join("");
			fs.readFile("./"+filePath,'utf8', function (err, data) {
		  		if (err) throw err;
		  		done(data);
			});	
		} else {
			done(stdin);
		}
		
	},
	head: function(stdin, filename, done) {
		if (stdin == undefined) {
			var filePath = filename.join("");
			fs.readFile("./"+filePath,'utf8', function (err, data) {
		  		if (err) throw err;
		  		done(data.split("\n").slice(0, 5).join('\n'));
			});	
		} else {
			done(stdin.split("\n").slice(0, 5).join('\n'));
		}
		
	},
	tail: function (stdin, filename, done) {
		var filePath = filename.join("");
		fs.readFile("./"+filePath,'utf8', function (err, data) {
		  if (err) throw err;
		  process.stdout.write('----------------start----------------\n');
		  console.log(data.split("\n").slice(-5).join('\n'));
		  process.stdout.write('----------------end----------------\nprompt > ');
		});
	},
	sort: function (stdin, filename, done) {
		var filePath = filename.join("");
		fs.readFile("./"+filePath,'utf8', function (err, data) {
		  if (err) throw err;
		  process.stdout.write('----------------start----------------\n');
		  console.log(data.split("\n").sort().join('\n'));
		  process.stdout.write('----------------end----------------\nprompt > ');
		});
	},
	wc: function (stdin, filename, done) {
		if (stdin == undefined) {
			var filePath = filename.join("");
			fs.readFile("./"+filePath,'utf8', function (err, data) {
		  		if (err) throw err;
		  		console.log(data.split("\n").length + " lines");
			});
		} else {
			done(stdin.split("\n").length + " lines");
		}
		
	},
	uniq: function (stdin, filename, done) {
		var filePath = filename.join("");
		fs.readFile("./"+filePath,'utf8', function (err, data) {
		  if (err) throw err;
		  var returnData = [];
		  var sortedData = data.split('\n').sort();
		  for (var i = 0; i < sortedData.length - 1; i++) {
		  	if (sortedData[i].replace(/\s*/, "") !== ''
		  		&& sortedData[i] !== sortedData[i + 1]) returnData.push(sortedData[i]);
		  };
		  process.stdout.write('----------------start----------------\n');
		  console.log(returnData.join('\n'));
		  process.stdout.write('----------------end----------------\nprompt > ');
		});
	},
	curl: function(dummy1, url, dummy2) {
		request.get('http://png262.github.io/GuessingGame/').on('error', function (err) {
			console.error(err);
			process.stdout.write('prompt > ');
		}).on('data', function(data) {
			console.log(data.toString('utf8'));
		}).on('end', function () {
			process.stdout.write('prompt > ');
		});
		
	}
};




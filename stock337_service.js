//Gunnar Samuelson, CS 337, stock337_service.js
//THis is my service file where I creeate and host my server with all of my data on it. THe data
//is stored in the same directory as this file. I used some of the logic from almost all of our
//past projects to help get this up and running properly. Mainly from the gerrymandering as that 
//prject relied heavily on using data from a server as well as setting up the server in the 
//first place.


const express = require("express");
const app = express();
var fs = require("fs");

app.use(express.static('public'));

function read_file(file_name) {
	var stocksFile = 0;
	try {  
	    stocksFile = fs.readFileSync(file_name, 'utf8');
	    console.log(stocksFile);    
	} catch(e) {
	    console.log('Error:', e.stack);
	}
	console.log(stocksFile)
	return stocksFile;
}

function build_json(line) {
	line = line.split(",");
	var data = {"Stock":line[0]}
	var lis = [];
	var ind = 0;
	for (var i = 1; i < line.length; i += 3) {
		lis[ind] = [parseInt(line[i + 1]), parseInt(line[i + 2])];
		ind += 1;
	}
	data["stocksFile"] = lis;
	return data
}

function find_line(districts, state) {
	//districts.replace("htt")
	var lines = districts.split("/symbol");
	var line = "";
	for (var i = 0; i < lines.length; i++) {
		if(lines[i].toLowerCase().includes(state.toLowerCase())){
			line = lines[i];
		}
	}
	return line;
}

console.log("Web Service Has Started");
app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");

	var stock = req.query.stock;
	if(stock == undefined) {
		res.status(400);
		res.send("Missing required parameters");
		}

	var file_name = "stock337data2.txt";
	
	var stockz = read_file(file_name);
	var line = find_line(stockz, stock);

	if(line == "") {
		res.status(410);
		res.send("State was not found");
		} 

    res.send(JSON.stringify(line));
})

app.listen(process.env.PORT);

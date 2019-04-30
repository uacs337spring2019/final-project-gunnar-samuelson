//Gunnar Samuelson, CSC Final Project, stock337.js
//The inspiration for this program came from my love for the stock market. I wanted to
// make an app that would easily pull up some useful and basic information about a 
//stock that you type in the search bar. I then have a watch list that you can add your 
//favorite stocks too and compare them in the future. The back end is hooked up to teh html page
//so I can easily grab and manipulate variables on the front end.


window.onload = function() {
	document.getElementById("search").onclick = submit;
	
}

function submit() {
	let stockID = document.getElementById("ticker").value;
	let url = "http://gunnar-samuelson-final-project.herokuapp.com/" + stockID;
	fetch(url)
		.then(checkStatus)
		.then(function(responseText) {
			let checker = JSON.parse(responseText);
			let formatted = checker.split("\t");
			let worked = formatted.slice(-7,-1);
			console.log(worked)
			postToPage(worked);
		})
		.catch(function(error) {
			console.log(error);
		});
}

function postToPage(tick) {
	let postToBodyComm = document.getElementById("stockInfo");
	let watchlistDiv = document.getElementById("watchlist");
	let company = "Company: " + tick[0];
	let price = "Price: $" + tick[1];
	let mktCap = "Market Cap: " + tick[2];
	let IPO = "IPO Year: " + tick[3];
	let sector = "Sector: " + tick[4];
	let core = "Core Business: " + tick[5];
	let finalPost = "<br><br>" + company + "<br><br>" + price + "<br><br>" + mktCap + "<br><br>" + IPO + "<br><br>" + sector + "<br><br>" + core;
	console.log("Company: " + company)
	console.log("Price: " + price)
	console.log("Market Cap: " + mktCap) 
	console.log("IPO Year: " + IPO)
	console.log("Sector: " + sector)
	console.log("Core Business: " + core)
	postToBodyComm.innerHTML = finalPost;
	document.getElementById("addWatch").onclick = function(){
		watchlistDiv.innerHTML += "<br>" + "- " + tick[0] + ":\t" + "$" + tick[1] + "<br>"};

}






function checkStatus(response) {  
    if (response.status >= 200 && response.status < 300) {  
        return response.text();
    } else if (response.status == 404) {
    	// sends back a different error when we have a 404 than when we have
    	// a different error
    	return Promise.reject(new Error("Sorry, we couldn't find that page")); 
    } else {  
        return Promise.reject(new Error(response.status+": "+response.statusText)); 
    } 
}
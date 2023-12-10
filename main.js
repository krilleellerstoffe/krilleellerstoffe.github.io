"use strict";
/* Christopher O'Driscoll al0038@mau.se */
var omdbAPI = new XMLHttpRequest();
//use the stored API key from .env
const API_KEY = 'b53806ad';
// Den URL vi ska använda oss av
var omdbURL = "https://www.omdbapi.com/?apikey=" + API_KEY + "&s=";

// Find form to get search query from
var form = document.getElementById("search-form");
// Add listener to form
form.addEventListener("submit", function(event) {
	event.preventDefault();	
	var query = this.elements.query.value;
	// Validate search query
	if (query.length <= 0 || query.length > 50) {
		alert("Query invalid, please enter a search term between 0-50 characters long!");
		return;
	}
	// If query ok, send API request
	omdbAPI.open("get", omdbURL + query, true);
	omdbAPI.send();
});
	
// When a response from the API is received
omdbAPI.addEventListener("load", function() {
	// Parse response into a JSON object
	var result = JSON.parse(this.responseText);
	// Check that there are results in the response
	if (!result.Search) {
		alert("No results, please try another search!");
		return;
	}
	// Find element to populate with results
	var resultsTable = document.getElementById("results")
	// Clear table ready for new results list
	resultsTable.innerHTML = '';
	// Add each result to results table
	result.Search.forEach((item) => {
		//create new row with two cells
		const row = resultsTable.insertRow();
		const cellTitle = row.insertCell();
		const cellImage = row.insertCell();
		//create link with title/year
		var resultTextWithLink = document.createElement("a");
		resultTextWithLink.innerHTML = `${item.Title} (${item.Year})`;
		resultTextWithLink.href = `https://www.imdb.com/title/${item.imdbID}/`;
		resultTextWithLink.target = '_blank';
		//create image with poster
		var resultImage = document.createElement("img");
		resultImage.src = item.Poster;
		resultImage.height = 100;
		//wrap image with link
		var resultImageWithLink = document.createElement('a');
		resultImageWithLink.href = `https://www.imdb.com/title/${item.imdbID}/`;
		resultImageWithLink.target = '_blank';
		resultImageWithLink.appendChild(resultImage);
		//add to results table
		cellTitle.appendChild(resultTextWithLink);
		cellImage.appendChild(resultImageWithLink);
		});
});
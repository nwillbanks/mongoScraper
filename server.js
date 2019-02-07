var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Require all models
// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from New York Post's board:" +
            "\n***********************************\n");

// Making a request via axios for top New York Post articles. The page's HTML is passed as the callback's third argument
axios.get("https://nypost.com/").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Find each p-tag with the "title" class
  $("p.title").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var title = $(element).text();

    // save the values for any "href" attributes that the child elements have
    var link = $(element).children().attr("href");

    // Save results in an object to push into results array
    results.push({
      title: title,
      link: link
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});
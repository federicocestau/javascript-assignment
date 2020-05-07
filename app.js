// import data variable from data.js, rename as tbodydata
var tbodydata = data;

// select the tbody element from the html
tbody=d3.select('tbody');

// buildtable takes in data as a parameter and adds it as a table to the tbody
function buildtable(tbodydata) { 
  console.log('Run Build Table')

  // for each object in the array of data
  tbodydata.forEach(function(report) {

    // add a new row
    var row = tbody.append("tr");

    // for each key, value in the object, add a new cell
    Object.entries(report).forEach(function([key, value]) {
        var cell = row.append("td");
        cell.text(value);
      });
    });
}

// run the buildtable function with the original data
buildtable(tbodydata);

//Select the button
var button = d3.select("#filter-btn");
//when you name an element use #. 
//when you reference an html ID in Jscrpt or CSS use #. 
//when you reference an html class in JS or CSS use .

// when you click on the button, run this function
button.on("click", function() {

  // Get the value property of each input element
  // add them to an object called conditions
  conditions = {}
  conditions['datetime'] = d3.select("#datetime").property("value");
  conditions['city'] = d3.select("#city").property("value");
  conditions['state'] = d3.select("#state").property("value");
  conditions['country'] = d3.select("#country").property("value");
  conditions['shape'] = d3.select("#shape").property("value");

  // check to see if the conditions worked
  console.log(conditions);

  // initialize the filteredData to the original tbodydata
  var filteredData = tbodydata;

  // loop through the conditions; if it is nonempty, filter the data using the condition
  Object.entries(conditions).forEach(([key, value]) => {
    if (value != ""){
      filteredData = filteredData.filter(report => report[key] === conditions[key])
    }
  });

  // remove the original table
  d3.select("tbody").html('');

  // re-build the table using the filtered data.
  buildtable(filteredData);
});


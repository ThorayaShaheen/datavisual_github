$(document).ready(function(){


  // find out the gitHubUser
  var gitHubUser = 'elementary';
  var repo = 'music';

  // get user
  function getUserData(callback) {
    $.get("https://api.github.com/users/" + gitHubUser, 
      function(data, status){
        console.log(status);
        success: callback(data, status);
    });
  };

  // get repos
  function getUserRepos(callback){
    $.get("https://api.github.com/users/" + gitHubUser + "/repos", 
      function(data, status){
        console.log(status);
        success: callback(data,status);
    });
  };

  // get languages
  function getRepoActivity(callback,repo){
    $.get("https://api.github.com/repos/" + gitHubUser + "/" + repo + "/stats/commit_activity", 
      function(data, status){
          console.log(status);
          success: callback(data,status,repo);
    });
  };

  function getRepoContributors(callback,repo){
    $.get("https://api.github.com/repos/" + repo + "/stats/contributors", 
      function(data, status){
          console.log(status);
          success: callback(data,status,repo);
    });
  };
  // getRepoActivity(, 'github-api-access');



  getRepoActivity(function (git_data){
    var data = [];
    for(var i=0;i<git_data.length;i++){
      data.push({title: "Week "+(i+1), plays: git_data[i].total},)
    }
    drawBarChart(data);
  },repo)
  getRepoContributors(function (git_data){
    var data = []
    for(var i=git_data.length-1;i>Math.max(-1,git_data.length-11);i--){
      data.push({login: git_data[i].author.login, total: (git_data[i].total)},)
    } 
    drawBubbleChart(data);
  },"mohelm97/music")

});

function drawBarChart(data){
  // mostly via https://gist.github.com/Jverma/887877fc5c2c2d99be10 with contextual updates
  // set the dimensions of the canvas
  var margin = {top: 20, right: 20, bottom: 70, left: 40},
      width = 1200 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;


  // set the ranges
  var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

  var y = d3.scale.linear().range([height, 0]);

  // define the axis
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")


  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(d3.max(data, function(d) { return d.plays; })/*data.length*/);


  // add the SVG element
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d.title; }));
    y.domain([0, d3.max(data, function(d) { return d.plays; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");
    // Add bar chart
    svg.selectAll("bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.title); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.plays); })
        .attr("height", function(d) { return height - y(d.plays); });

}
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



var data = {[]}
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



}
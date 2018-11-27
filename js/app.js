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



  function getRepoContributors(callback,repo){
    $.get("https://api.github.com/repos/" + repo + "/stats/contributors", 
      function(data, status){
          console.log(status);
          success: callback(data,status,repo);
    });
  };
  // getRepoActivity(, 'github-api-access');




}
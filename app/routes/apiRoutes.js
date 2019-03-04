// Dependencies
var path = require("path");

// LOAD DATA
var Friends = require("../data/friends");


// ROUTING
module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link  
    app.get("/api/friends", function(req, res) {
      res.json(Friends);
    });
    
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array  
    app.post("/api/friends", function(req, res) {
     var userInput = req.body
     var userScore = userInput.scores
     var bestFriend = {
       name: "",
       photo: ""
     }
     var minScore = Infinity
     
     for(var i = 0; i < Friends.length; i++){
       var friendScore = Friends[i].scores
       var totalDifference = 0;
       for(var j = 0; j < userScore.length; j++){
        totalDifference+=Math.abs(parseInt(friendScore[j])-parseInt(userScore[j]))
     }
     if(totalDifference <= minScore){
       minScore = totalDifference;
       bestFriend.name = Friends[i].name;
       bestFriend.photo = Friends[i].photo;
     }
    }
    Friends.push(userInput);
    res.json(bestFriend);
  });
  
  };
  
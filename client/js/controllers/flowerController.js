angular.module('flowers').controller('FlowersController', ['$scope', 'Flowers',
  function ($scope, Flowers) {
    $scope.sightingInfo = {};
    $scope.flowerInfo = {};
    /* Get all the flowers, then bind it to the scope */
    Flowers.getAll().then(function (response) {
      $scope.flowers = response.data;
    }, function (error) {
      console.log('Unable to retrieve flowers:', error);
    });

    $scope.showDetails = function (flower) {
      $scope.detailedInfo = {
        name: flower.name,
        genus: flower.genus,
        species: flower.species,
        sightings: flower.sightings
      };
    };

        //Adding a classroom
        $scope.addSighting = function (index, place) {

          //Accounts for filtered data
          index = $scope.listings.indexOf(place);
    
          //Ensure the user is logged in prior to them adding a classroom.
          var user = firebase.auth().currentUser;
          if(user != null) {
            var roomInfo = $scope.roomInfo;
    
            console.log(roomInfo);
            if(roomInfo.roomNumber == null || roomInfo.outlets == null || roomInfo.description == null || roomInfo.description == '') {
              window.alert("Must fill in all the fields to add a classroom!");
              return;
            }
    
            var duplicateRoom = false;
      
            //Check if the room number already exists.
            for (var i = 0; i < $scope.listings[index].classRoomArray.length; i++) {
              if ($scope.listings[index].classRoomArray[i].roomNumber == roomInfo.roomNumber) {
                duplicateRoom = true;
                break;
              }
            }
      
            //If it exists, reset the request and return.
            if (duplicateRoom) {
              window.alert("Cannot add duplicate room number!");
              $scope.roomInfo = {rating: {}}; //Clear the scope afterwards.
              $scope.roomInfo.roomSize = "Small"; //And set the small box to be checked.
              $scope.roomInfo.blackboard = false;
              $scope.roomInfo.whiteboard = false;
              $scope.roomInfo.isOccupied = false;
              return;
            }
            //Otherwise add the classroom the building's classroom array.
            else {
              $scope.listings[index].classRoomArray.push(roomInfo);
      
              Listings.update($scope.listings[index]._id, $scope.listings[index]).then(function (response) { }, function (error) {
                console.log('Unable to update listing:', error);
              });
      
              $scope.roomInfo = {rating: {}}; //Clear the scope afterwards.
              $scope.roomInfo.roomSize = "Small"; //And set the small box to be checked.
              $scope.roomInfo.blackboard = false;
              $scope.roomInfo.whiteboard = false;
              $scope.roomInfo.isOccupied = false;
    
              window.alert("A new room has been added to : " + place.code);
              location.reload();
              }
          }
          else {
            window.alert("You must be logged in to create a new classroom!");
            location.reload();
            return;
          }
        };
   
    //Search for classrooms in the search bar.
    $scope.searchFilterCustom = function (entry) {

      return function (entry) {
        if (typeof $scope.filterText == 'undefined') {
          return entry;
        }
        //Case insensitive
        if (entry.code.toLowerCase().includes($scope.filterText.toLowerCase()) || entry.name.toLowerCase().includes($scope.filterText.toLowerCase())) {
          return entry;
        }
      }
    };

    $scope.loadFlowerInfo = function(flower) {
      document.getElementById("flower-image").src = "img/flowers/" + flower.name + ".png";
      $scope.showDetails(flower);
    };
  }
]);
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
        $scope.addSighting = function (flower) {

          index = $scope.flowers.indexOf(flower);
    
          //Ensure the user is logged in prior to them adding a sighting
          var user = firebase.auth().currentUser;
          if(user != null) {
            var sightingInfo= $scope.sightingInfo;
            sightingInfo.name = flower.name;
    
            console.log(sightingInfo);
            console.log($scope.flowers[index].sightings);
            if(sightingInfo.person == '' || sightingInfo.location == '' || sightingInfo.date == '') {
              window.alert("Must fill in all the fields to add a sighting!");
              return;
            }

              Flowers.create(sightingInfo).then(function (response) { }, function (error) {
                   console.log('Unable to update flower:', error);
                 });
      
              $scope.sightingInfo = {}; //Clear the scope afterwards.

              window.alert("A new sighting has been added to : " + flower.name);
              location.reload();
              }
          else {
            window.alert("You must be logged in to create a new sighting!");
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
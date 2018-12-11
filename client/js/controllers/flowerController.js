angular.module('flowers').controller('FlowersController', ['$scope', 'Flowers',
  function ($scope, Flowers) {
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
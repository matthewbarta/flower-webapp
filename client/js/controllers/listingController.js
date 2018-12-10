angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function ($scope, Listings) {
 
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function (response) {
      $scope.listings = response.data;
    }, function (error) {
      console.log('Unable to retrieve listings:', error);
    });

   
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
    };
  }
]);
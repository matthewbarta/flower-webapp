angular.module('flowers').controller('FlowersController', ['$scope', 'Flowers',
  function ($scope, Flowers) {
    $scope.sightingInfo = {};
    $scope.flowerInfo = {
      name: '',
      genus: '',
      species: ''
    };

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

    //Adding a sighting
    $scope.addSighting = function (flower) {

      index = $scope.flowers.indexOf(flower);

      //Ensure the user is logged in prior to them adding a sighting
      var user = firebase.auth().currentUser;
      if (user != null) {
        var sightingInfo = $scope.sightingInfo;
        sightingInfo.name = flower.name;

        console.log(sightingInfo);
        console.log($scope.flowers[index].sightings);
        if (sightingInfo.person == '' || sightingInfo.location == '' || sightingInfo.date == '') {
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

    $scope.editFlower = function (flower) {

      index = $scope.flowers.indexOf(flower);

      //Ensure the user is logged in prior to them adding a sighting
      var user = firebase.auth().currentUser;
      if (user != null) {
        var flowerInfo = $scope.flowerInfo;
        flowerInfo.oldName = flower.name;

        if (flowerInfo.name == '' && flowerInfo.genus == '' && flowerInfo.species == '') {
          window.alert("Enter data in at least one of the fields!");
          return;
        }
        if (flowerInfo.name == '') {
          flowerInfo.name = flower.name;
        }
        if (flowerInfo.genus == '') {
          flowerInfo.genus = flower.genus;
        }
        if (flowerInfo.species == '') {
          flowerInfo.species = flower.species;
        }

        console.log(flowerInfo);

        Flowers.update(flower.name, flowerInfo).then(function (response) { }, function (error) {
             console.log('Unable to update flower:', error);
            });

        $scope.flowerInfo = {
          name: '',
          genus: '',
          species: ''
        }; //Clear the scope afterwards.

        window.alert(flower.name + " has been edited!");
        location.reload();
      }
      else {
        window.alert("You must be logged in to create a new sighting!");
        location.reload();
        return;
      }
    };

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

    $scope.loadFlowerInfo = function (flower) {
      document.getElementById("flower-image").src = "img/flowers/" + flower.name + ".png";
      $scope.showDetails(flower);
    };
  }
]);
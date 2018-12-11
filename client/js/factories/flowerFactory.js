angular.module('flowers', []).factory('Flowers', function($http) {
  var methods = {
    getAll: function() {
        return $http.get('http://localhost:8080/api/flowers');
    },  
  create: function(flowerSighting) {
      return $http.post('http://localhost:8080/api/flowers', flowerSighting);
    },
    
  update : function(id, flowerInfo) {
      return $http.put(`http://localhost:8080/api/flowers/${id}`, flowerInfo);
    },
    
  delete: function(id) {
      return $http.delete(`http://localhost:8080/api/flowers/${id}`);
    }
  };
   return methods;
});
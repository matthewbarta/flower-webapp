angular.module('flowers', []).factory('Flowers', function($http) {
  var methods = {
    getAll: function() {
        return $http.get('http://localhost:8080/api/flowers');
    },
  
  create: function(flower) {
      return $http.post('http://localhost:8080/api/flowers', flower);
    },
    
  update : function(id, flower) {
      return $http.put(`http://localhost:8080/api/flowers/${id}`, flower);
    },
    
  delete: function(id) {
      return $http.delete(`http://localhost:8080/api/flowers/${id}`);
    }
  };
   return methods;
});
/* register the modules the application depends upon here*/
angular.module('flowers', ['firebase']);

/* register the application and inject all the necessary dependencies */
var app = angular.module('flowerApp', ['flowers', 'firebase']);
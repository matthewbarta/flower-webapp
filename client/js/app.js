/* register the modules the application depends upon here*/
angular.module('listings', ['firebase']);

/* register the application and inject all the necessary dependencies */
var app = angular.module('flowerApp', ['listings', 'firebase']);
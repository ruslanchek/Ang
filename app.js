// angular.module('mainApp', ['ngResource']);
//
// angular.module('myApp.services').factory('Entry', function($resource) {
//     return $resource('http://jsonplaceholder.typicode.com/posts/:id'); // Note the full endpoint address
// });
//
// angular.module('myApp.controllers',[]);
//
// angular.module('myApp.controllers').controller('ResourceController', function($scope, Entry) {
//     var entries = Entry.query(function() {
//         console.log(entries);
//     });
// });

var phonecatApp = angular.module('myApp', ['ngResource', 'angular-loading-bar', 'ngAnimate']);

phonecatApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
}]);

phonecatApp.controller('listCtrl', function ($scope, $http) {
    $http.get('http://jsonplaceholder.typicode.com/posts/').success(function(data) {
        $scope.items = data;
    });

    $scope.orderProp = 'title';
});

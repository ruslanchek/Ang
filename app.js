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

var myApp = angular.module('myApp', ['ngResource', 'angular-loading-bar', 'ngAnimate', 'ngRoute']);

myApp.filter('ie', function(){
    return function(v, yes, no){
        return v ? yes : no;
    };
});

myApp.controller('appCtrl', function($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
});

myApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
}]);

myApp.controller('listCtrl', function ($scope, $http, $routeParams) {
    $scope.name = "listCtrl";
    $scope.params = $routeParams;

    $http.get('http://jsonplaceholder.typicode.com/posts/').success(function(data) {
        $scope.items = data;
    });

    $scope.orderProp = 'id';

    $scope.setSorting = function(by) {
        $scope.orderProp = by;
    };
});

myApp.controller('itemCtrl', function ($scope, $http, $routeParams) {
    $scope.name = "itemCtrl";
    $scope.params = $routeParams;
    $scope.ready = false;

    $http.get('http://jsonplaceholder.typicode.com/posts/' + $routeParams.id).success(function(data) {
        $scope.item = data;
        $scope.ready = true;
    });
});

myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/list/:id', {
            templateUrl: 'item.html',
            controller: 'itemCtrl',
            resolve: {
                // I will cause a 1 second delay
                delay: function($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 100);
                    return delay.promise;
                }
            }
        })
        .when('/list/', {
            templateUrl: 'list.html',
            controller: 'listCtrl'
        });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
});

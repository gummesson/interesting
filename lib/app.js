  var App = angular.module('Interesting', []);

  // 1. This doesn't really work since there is no real API involved, 
  //    but we'll leave it in for good measure.
  App.config(['$locationProvider', '$routeProvider',
      function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/', {
      templateUrl: '/assets/html/list.html',
      controller: 'ListCtrl'
    })
    .when('/:id', {
      templateUrl: '/assets/html/single.html',
      controller: 'SingleCtrl'
    })
    .otherwise({
      redirectTo: '/' // [1]
    });
  }]);

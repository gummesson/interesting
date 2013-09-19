/*
 *  Interesting
 *
 *  A collection of midly interesting links.
 *
 *  Version: 0.1.0
 *  License: MIT
 *
 */
(function(angular) {

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

  App.factory('Links', ['$http', '$q',
      function($http, $q) {
    return {
      get: function() {
        var deferred = $q.defer();

        $http.get('/assets/data/data.json', {
          cache: true
        })
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function() {
          deferred.reject();
        });
        return deferred.promise;
      }
    };
  }]);

  App.controller('ListCtrl', ['$scope', 'Links',
      function($scope, Links) {
    Links.get().then(function(data) {
      $scope.links = data;
    });
  }]);

  App.controller('SingleCtrl', ['$scope', '$routeParams', '$location', 'Links',
      function($scope, $routeParams, $location, Links) {
    // 1. Redirects to the main page if the id doesn't exist.
    // 2. The "-1" makes up for the fact that the actual data array
    //    starts at 0 but the link ids and their routes starts at 1.
    Links.get().then(function(data) {
      if ($routeParams.id > data.length || $routeParams.id === '0') {
        $location.path('/'); // [1]
      } else {
        $scope.link = data[$routeParams.id - 1]; // [2]
      }
    });
  }]);

})(angular);

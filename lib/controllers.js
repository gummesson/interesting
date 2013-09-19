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

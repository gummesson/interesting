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

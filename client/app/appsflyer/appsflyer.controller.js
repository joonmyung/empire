'use strict';

angular.module('nodeApp')
  .controller('AppsflyerCtrl', function ($scope, $http, Appsflyer) {
    $scope.refresh = function() {
      $scope.appsflyers = Appsflyer.query();
      console.log($scope.appsflyer);
    };

    $scope.refresh();

    $scope.appId = function(event) {
      var json = angular.fromJson(event.content);
      return json['app_id'];
    };
    $scope.eventName = function(event) {
      var json = angular.fromJson(event.content);
      if (event.eventName == 'purchase') {
        return 'purchase ' + json['event_value'];
      } else {
        return event.eventName;
      }
    };

    $scope.deleteAll = function() {
      for(var i = 0; i < $scope.appsflyers.length; i++) {
        $scope.appsflyers[i].$delete();
      }
      $scope.refresh();
    };
  });
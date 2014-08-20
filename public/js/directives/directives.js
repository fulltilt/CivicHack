(function() {
  angular.module('BlogApp.directives', [])
    .directive('igLogin', function () {
      return {
        restrict: 'E',
        replace: true,
        templateUrl:'/partials/modal.html',
        controller: function ($scope) {
          $scope.cancel = function() {
            $scope.loggingIn = false;
            $("#loginModal").modal('hide');
          };
          
          $scope.$watch('loggingIn', function() {
            if ($scope.loggingIn) {
              $scope.loggingIn = false;
              $("#loginModal").modal('show');
            }
          });
        }
      };
    });
})();
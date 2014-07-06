
 
.controller('EditCtrl',
  function($scope, $location, $routeParams, $firebase, fbURL) {
    var recipeUrl = fbURL + $routeParams.recipeId;
    $scope.recipe = $firebase(new Firebase(recipeUrl));
 
    $scope.destroy = function() {
      //TODO
      $location.path('/');
    };
 
    $scope.save = function() {
      //TODO
      $location.path('/');
    };
});
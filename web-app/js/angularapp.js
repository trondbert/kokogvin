
angular.module('angularapp', ['ngRoute', 'firebase'])
  
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'list.html'
    })
    .when('/edit/:projectId', {
      controller:'EditCtrl',
      templateUrl:'detail.html'
    })
    .when('/new', {
      controller:'CreateCtrl',
      templateUrl:'detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})
 
.controller('ListCtrl', function($scope, $firebase) {
  var recipesRef = new Firebase("https://blinding-fire-2931.firebaseio.com/recipes");
  $scope.recipes = $firebase(recipesRef);
})

.controller('CreateCtrl', function($scope, $location, $timeout, $firebase) {
  console.log("CreateCtrl");

  var recipesRef = new Firebase("https://blinding-fire-2931.firebaseio.com/recipes");
  $scope.recipes = $firebase(recipesRef);

  $scope.save = function() {
    console.log("New");
    $scope.recipes.$add($scope.newRecipe);
    
    $scope.newRecipe = {};
    
    $location.path('/');
  }
})
  


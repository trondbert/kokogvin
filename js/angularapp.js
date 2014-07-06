
angular.module('angularapp', ['ngRoute', 'firebase'])
  
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'list.html'
    })
    .when('/edit/:recipeId', {
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

.value('fbUrl', 'https://blinding-fire-2931.firebaseio.com/recipes')
 
.controller('ListCtrl', function($scope, $firebase, fbUrl) {
  var recipesRef = new Firebase(fbUrl);
  $scope.recipes = $firebase(recipesRef);
})

.controller('CreateCtrl', function($scope, $location, $firebase, fbUrl) {
  console.log("CreateCtrl");

  var recipesRef = new Firebase(fbUrl);
  $scope.recipes = $firebase(recipesRef);

  $scope.save = function() {
    console.log("New");
    $scope.recipes.$add($scope.recipe);
    
    $scope.recipe = {};
    
    $location.path('/');
  }
})

.controller('EditCtrl', function($scope, $location, $routeParams, $firebase, fbUrl) {
  $scope.recipe = $firebase(new Firebase(fbUrl + '/' + $routeParams.recipeId));

  $scope.save = function() {
    console.log($scope.recipe.name)
  
    $scope.recipe.$transaction(function(currentRecipe) {
        currentRecipe.name = $scope.recipe.name
        currentRecipe.tags = $scope.recipe.tags
        return currentRecipe;
    }).then(function(snapshot) {
        if (!snapshot) {
          console.log("Error")
        } else {
          $location.path('/')
        }
    }, function(err) {
        console.log(err)
    });
  }

})
  


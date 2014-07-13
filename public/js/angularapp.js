
app = angular.module('angularapp', ['ngRoute', 'firebase'])
  
app.config(function($routeProvider) {
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

app.value('fbUrl', 'https://blinding-fire-2931.firebaseio.com/recipes')
 
app.controller('ListCtrl', function($scope, $firebase, fbUrl) {
  var recipesRef = new Firebase(fbUrl);
  $scope.recipes = $firebase(recipesRef);
})

app.controller('CreateCtrl', function($scope, $location, $firebase, fbUrl) {
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

app.controller('EditCtrl', function($scope, $location, $routeParams, $firebase, fbUrl) {
  $scope.recipe = $firebase(new Firebase(fbUrl + '/' + $routeParams.recipeId));

  $scope.save = function() {
    console.log($scope.recipe.name)
  
    $scope.recipe.$transaction(function(currentRecipe) {
        currentRecipe.name = $scope.recipe.name;
        currentRecipe.tags = $scope.recipe.tags;
        currentRecipe.image = $scope.recipe.image;
        currentRecipe.instructions = $scope.recipe.instructions;
        currentRecipe.ingredients = $scope.recipe.ingredients;
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

  $scope.changeImage = function() {
    var file = $("#recipeImage")[0].files[0],
    reader = new FileReader();
    
    reader.onloadend = function(e){
      var imageBase64 = e.target.result;
      console.log(imageBase64);
      $scope.recipe.image = imageBase64;
      $scope.$apply();
    }

    reader.readAsDataURL(file);
  }
})

app.directive('customOnChange', function() {
  'use strict';

  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      var onChangeFunc = element.scope()[attrs.customOnChange];
      element.bind('change', onChangeFunc);
    }
  };
});



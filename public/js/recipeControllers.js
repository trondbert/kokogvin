
function addRecipeControllers() {

    app.controller('RecipeListCtrl', ['$scope', '$controller', 'StorageService',
        function ($scope, $controller, StorageService) {
            $controller('ListCtrl', {$scope: $scope});

            $scope.search = function (item) {
                if (!$scope.query) {
                    return true;
                }
                var haystack = [item.name, item.tags, item.ingredients].join(";").toLowerCase();
                var needle = $scope.query.toLowerCase();

                return haystack.indexOf(needle) != -1;
            };

            $scope.imageAdded = function(imgSnap, prevVal) {
                var recipe = findRecipeById($scope.recipes, imgSnap.val().recipeID);
                if (recipe != null) {
                    recipe.image = imgSnap.val().image;

                    $scope.$applyAsync();
                }
            };

            if ($scope.userId) {
                $scope.recipes = StorageService.findAllRecipes($scope.imageAdded);
            }
        }]);

    app.controller('RecipeCreateCtrl', function ($scope, $controller, $location, StorageService) {
        $controller('ParentCtrl', {$scope: $scope});

        $scope.save = function () {
            $scope.editRecipeForm.submitted = true;

            var newRecipeID = StorageService.addRecipe($scope.recipe);

            $location.path("recipe/view/" + newRecipeID);
        };

        $scope.recipe = {};
        $scope.changeRecipeImage = function() { $scope.changeImage($scope.recipe); };
    });

    app.controller('RecipeEditCtrl', function ($scope, $controller, $location, $routeParams, StorageService) {
        $controller('ParentCtrl', {$scope: $scope});

        $scope.save = function () {
            $scope.editRecipeForm.submitted = true;
            var recipeValid = $scope.editRecipeForm.$valid;
            if (recipeValid) {
                StorageService.updateRecipe($scope.recipe);
                $location.path('/recipe/view/' + $routeParams.recipeId);
            } else {
                window.scrollTo(0, 0);
            }
        };
        $scope.changeRecipeImage = function() { 
            $scope.changeImage($scope.recipe); 
        };

        $scope.recipe = StorageService.findRecipe($routeParams.recipeId, function(snap, imagesRef) {
                $scope.setImageOnRecipe(snap);
                $scope.$applyAsync();
            }
        );
    });

    app.controller('RecipeViewCtrl', function ($scope, $controller, $location, $routeParams, StorageService) {
        $controller('ParentCtrl', {$scope: $scope});

        $scope.ingredientsWithBreaks = function () {
            return $scope.recipe.ingredients && $scope.recipe.ingredients.replace(/\n/g, '<br/>');
        };
        $scope.instructionsWithBreaks = function () {
            return $scope.recipe.instructions && $scope.recipe.instructions.replace(/\n/g, '<br/>');
        };

        $scope.recipe = StorageService.findRecipe($routeParams.recipeId, function(snap, imagesRef) {
                $scope.setImageOnRecipe(snap);
                $scope.$applyAsync();
            }
        );
    });
}



/** Either returns recipe from rootScope or fetches a new recipe and stores that in the rootScope.
  * Returns the recipe */
function recipeFinder($rootScope)
{
    this.execute = function($scope, recipeId, StorageService) {
        var recipe = {};
        if (!$rootScope.recipe || $rootScope.recipe.$id != recipeId) {
            recipe = StorageService.findRecipe(recipeId, function (snap) {
                    $scope.setImageOnRecipe(snap);
                    $scope.$applyAsync();
                }
            );
            $rootScope.recipe = recipe;
        }
        else {
            recipe = $rootScope.recipe;
        }
        return recipe;
    };
}

function addRecipeControllers()
{
    app.controller('RecipeListCtrl', ['$scope', '$controller', 'StorageService',
                              function ($scope, $controller, StorageService)
        {
            $controller('ListCtrl', {$scope: $scope});

            $scope.search = function (item)
            {
                if (!$scope.query) {
                    return true;
                }
                var haystack = [item.name, item.tags, item.ingredients].join(";").toLowerCase();
                var needle = $scope.query.toLowerCase();

                return haystack.indexOf(needle) != -1;
            };

            $scope.imageAdded = function(imgSnap)
            {
                var recipe = findRecipeById($scope.recipes, imgSnap.val().recipeID);
                if (recipe != null) {
                    recipe.image = imgSnap.val().image;

                    $scope.$applyAsync();
                }
            };

            if ($scope.userId) {
                $scope.recipes = StorageService.findAllRecipes($scope.imageAdded);
            }
        }
    ]);

    app.controller('RecipeCreateCtrl', ['$scope', '$controller', '$location', 'StorageService', function ($scope, $controller, $location, StorageService) {
        $controller('ParentCtrl', {$scope: $scope});

        $scope.save = function () {
            $scope.editRecipeForm.submitted = true;

            var newRecipeID = StorageService.addRecipe($scope.recipe);

            $location.path("recipe/view/" + newRecipeID);
        };

        $scope.changeRecipeImage = function() { $scope.changeImage($scope.recipe); };

        $scope.recipe = {};
    }]);

    app.controller('RecipeEditCtrl',
                        ['$scope', '$controller', '$location', '$routeParams', 'StorageService', 'RecipeFinder',
                function ($scope, $controller, $location, $routeParams, StorageService, RecipeFinder)
        {
            $controller('ParentCtrl', {$scope: $scope});
            debugMsg("RecipeEditCtrl");

            $scope.remove = function ()
            {
                StorageService.removeRecipe($scope.recipe, function (result) {
                    if (result) { alert("Error: " + result); }
                    else { $location.path("recipe/list"); }
                });
            };

            $scope.save = function ()
            {
                $scope.editRecipeForm.submitted = true;
                if ($scope.editRecipeForm.$valid) {
                    StorageService.updateRecipe($scope.recipe);
                    $location.path('/recipe/view/' + $routeParams.recipeId);
                } else {
                    window.scrollTo(0, 0);
                }
            };

            $scope.changeRecipeImage = function() {
                $scope.changeImage($scope.recipe);
            };

            $scope.recipe = RecipeFinder.execute($scope, $routeParams.recipeId, StorageService);
        }
    ]);

    app.controller('RecipeViewCtrl',
                        ['$scope', '$controller', '$location', '$routeParams', 'StorageService', 'RecipeFinder',
                function ($scope, $controller, $location, $routeParams, StorageService, RecipeFinder)
        {
            $controller('ParentCtrl', {$scope: $scope});
            debugMsg("RecipeViewCtrl");

            $scope.ingredients1WithBreaks = function () {
                return $scope.recipe.ingredients1 && $scope.recipe.ingredients1.replace(/\n/g, '<br/>');
            };
            $scope.ingredients2WithBreaks = function () {
                return $scope.recipe.ingredients2 && $scope.recipe.ingredients2.replace(/\n/g, '<br/>');
            };
            $scope.instructionsWithBreaks = function () {
                return $scope.recipe.instructions && $scope.recipe.instructions.replace(/\n/g, '<br/>');
            };

            $scope.recipe = RecipeFinder.execute($scope, $routeParams.recipeId, StorageService);
        }
    ]);
}


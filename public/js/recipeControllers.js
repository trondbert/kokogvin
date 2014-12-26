
/** Either returns recipe from rootScope or fetches a new recipe and stores that in the rootScope.
  * Returns the recipe */
function recipeFinder($rootScope)
{
    this.execute = function($scope, recipeId, StorageService) {
        if (!$rootScope.recipe || $rootScope.recipe.$id != recipeId) {
            StorageService.findRecipe(recipeId,
                function(recipe) {
                    $scope.recipe = recipe;
                    $scope.$applyAsync();
                    $rootScope.recipe = recipe;
                },
                function () {
                    $scope.$applyAsync();
                }
            );
        }
        else {
            $scope.recipe = $rootScope.recipe;
            $scope.$applyAsync();
        }
    };
}

function addRecipeControllers() {
    app.controller('RecipeCtrl', ['$scope', function($scope) {
            $scope.addRecipe = function (recipe) {
                $scope.recipes.push(recipe);
                $scope.$applyAsync();
            };
        }
    ]);
    app.controller('RecipeListCtrl', ['$scope', '$controller', '$routeParams', 'StorageService',
                              function ($scope, $controller, $routeParams, StorageService) {
            $controller('ListCtrl',   {$scope: $scope});
            $controller('RecipeCtrl', {$scope: $scope});

            $scope.search = function (item) {
                if (!$scope.query) {
                    return true;
                }
                var haystack = [item.name, item.tags, item.ingredients].join(";").toLowerCase();
                var needle = $scope.query.toLowerCase();

                return haystack.indexOf(needle) != -1;
            };

            $scope.imageAdded = function(image) {
                if (image == null) return;

                var recipe = findRecipeById($scope.recipes, image.recipeID);
                if (recipe != null) {
                    recipe.image = image.image;
                    $scope.$applyAsync();
                }
            };

            $scope.recipes = [];
            if ($scope.userId) {
                if ($routeParams.tags) {
                    var tagList = $routeParams.tags.split("&");
                    StorageService.findRecipesByTags(tagList, $scope.addRecipe, $scope.imageAdded);
                } else {
                    StorageService.findAllRecipes($scope.addRecipe, $scope.imageAdded);
                }
                $scope.$applyAsync();
            }
        }
    ]);

    app.controller('RecipeCreateCtrl', ['$scope', '$controller', '$location', 'StorageService', function ($scope, $controller, $location, StorageService) {
        $controller('ParentCtrl', {$scope: $scope});

        $scope.save = function () {
            $scope.editRecipeForm.submitted = true;

            StorageService.addRecipe($scope.recipe, function (recipeId) {
                $location.path("/recipe/view/" + recipeId);
            });

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
                    else { $location.path("/recipe/list"); }
                });
            };

            $scope.save = function ()
            {
                $scope.editRecipeForm.submitted = true;
                if ($scope.editRecipeForm.$valid) {
                    StorageService.updateRecipe($scope.recipe, function(recipeId) {
                        debugMsg("updateRecipe callback");
                        $location.path('/recipe/view/' + recipeId);
                    });
                } else {
                    window.scrollTo(0, 0);
                }
                $location.path('/recipe/view/' + $scope.recipe.$id);
            };

            $scope.changeRecipeImage = function() {
                $scope.changeImage($scope.recipe);
            };

            RecipeFinder.execute($scope, $routeParams.recipeId, StorageService);
        }
    ]);

    app.controller('RecipeViewCtrl',
                        ['$scope', '$controller', '$location', '$routeParams', 'StorageService', 'RecipeFinder',
                function ($scope, $controller, $location, $routeParams, StorageService, RecipeFinder)
        {
            $controller('ParentCtrl', {$scope: $scope});
            debugMsg("RecipeViewCtrl");

            $scope.ingredients1WithBreaks = function () {
                if (!$scope.recipe) return;
                return $scope.recipe.ingredients1 && $scope.recipe.ingredients1.replace(/\n/g, '<br/>');
            };
            $scope.ingredients2WithBreaks = function () {
                if (!$scope.recipe) return;
                return $scope.recipe.ingredients2 && $scope.recipe.ingredients2.replace(/\n/g, '<br/>');
            };
            $scope.instructionsWithBreaks = function () {
                if (!$scope.recipe) return;
                return $scope.recipe.instructions && $scope.recipe.instructions.replace(/\n/g, '<br/>');
            };

            RecipeFinder.execute($scope, $routeParams.recipeId, StorageService);
        }
    ]);
}


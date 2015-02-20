
function addRecipeControllers() {
    app.controller('RecipeCtrl', ['$scope', '$rootScope', 'StorageService',
                          function($scope,   $rootScope,   StorageService) {

            $scope.addRecipe = function (recipe) {
                $scope.recipes.push(recipe);
                $scope.$applyAsync();
            };

            $scope.findRecipe = function (recipeId) {
                $scope.recipe = {}; $scope.image = {};
                var recipeFoundCB = function(recipe) {
                    $scope.recipe = recipe;
                    $scope.transients = {
                        ingredients1: recipe.ingredients.split(INGREDIENTS_COLUMN_BREAK)[0] || "",
                        ingredients2: recipe.ingredients.split(INGREDIENTS_COLUMN_BREAK)[1] || ""
                    };
                    $scope.$applyAsync();
                };
                var imageFoundCB = function(recipe, image) {
                    if (image && image.imageData && !$scope.image.imageData) {
                        $scope.image = image;
                    } else if (!$scope.image.imageData) {
                        $scope.image = {};
                    }
                    $scope.$applyAsync();
                };
                StorageService.findRecipe(recipeId, recipeFoundCB, imageFoundCB);
                //if (!$rootScope.recipe || $rootScope.recipe.$id != recipeId) {
                //    debugMsg("Looking up recipe in backend");
                //    StorageService.findRecipe(recipeId, recipeFoundCB, imageFoundCB);
                //}
                //else {
                //    debugMsg("Found recipe in local storage");
                //    $scope.transients = {
                //        ingredients1: $scope.recipe.ingredients.split(INGREDIENTS_COLUMN_BREAK)[0] || "",
                //        ingredients2: $scope.recipe.ingredients.split(INGREDIENTS_COLUMN_BREAK)[1] || ""
                //    };
                //    if ($rootScope.image && $rootScope.image.recipeID == $scope.recipe.$id) {
                //        $scope.image = $rootScope.image;
                //    } else {
                //        StorageService.findImage($scope.recipe, imageFoundCB);
                //    }
                //    $scope.$applyAsync();
                //}
            };

            $scope.withBreaks = function(input) {
                return input && input.replace(/\n/g, '<br/>');
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

            $scope.imageAdded = function(recipe, image) {
                recipe.imageData = image ? image.imageData : null;
                $scope.$applyAsync();
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

    app.controller('RecipeCreateCtrl', ['$scope', '$controller', '$location', 'StorageService',
        function ($scope, $controller, $location, StorageService) {
            $controller('ParentCtrl', {$scope: $scope});

            $scope.save = function () {
                $scope.editRecipeForm.submitted = true;

                $scope.recipe.ingredients = $scope.transients.ingredients1 +
                                            INGREDIENTS_COLUMN_BREAK +
                                            $scope.transients.ingredients2;
                StorageService.addRecipe($scope.recipe, $scope.image, function (recipeId) {
                    $location.path("/recipe/view/" + $scope.recipe.$id);
                });
            };

            $scope.changeRecipeImage = function() { $scope.changeImage($scope.image); };

            $scope.recipe = {}; $scope.image = {};
    }]);

    app.controller('RecipeEditCtrl',
                        ['$scope', '$controller', '$location', '$routeParams', 'StorageService',
                function ($scope, $controller, $location, $routeParams, StorageService)
        {
            $controller('ParentCtrl', {$scope: $scope});
            $controller('RecipeCtrl', {$scope: $scope});
            debugMsg("RecipeEditCtrl");

            $scope.remove = function ()
            {
                var error = "Sletting av '" + $scope.recipe.name + "' feila.";
                StorageService.removeRecipe($scope.recipe, function (result) {
                    if (result) { $scope.showNotice(error); }
                });
                $location.path("recipe/list");
            };

            $scope.save = function ()
            {
                $scope.recipe.ingredients = $scope.transients.ingredients1 +
                                            INGREDIENTS_COLUMN_BREAK +
                                            $scope.transients.ingredients2;

                $scope.editRecipeForm.submitted = true;
                if ($scope.editRecipeForm.$valid) {
                    var error = "Oppdatering av '" + $scope.recipe.name + "' feila.";
                    StorageService.updateRecipe($scope.recipe, $scope.image, function(result) {
                        if (result) { $scope.showNotice(result + error); }
                    });
                    $location.path('recipe/view/' + $scope.recipe.$id);
                }
                else {
                    window.scrollTo(0, 0);
                }
            };

            $scope.changeRecipeImage = function() {
                $scope.changeImage($scope.image);
            };

            $scope.findRecipe($routeParams.recipeId);
        }
    ]);

    app.controller('RecipeViewCtrl',
                        ['$scope', '$controller', '$location', '$routeParams',
                function ($scope,   $controller,   $location,   $routeParams)
        {
            $controller('ParentCtrl', {$scope: $scope});
            $controller('RecipeCtrl', {$scope: $scope});
            debugMsg("RecipeViewCtrl");

            $scope.findRecipe($routeParams.recipeId);
        }
    ]);
}


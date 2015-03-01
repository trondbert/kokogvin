
function addRecipeControllers() {
    app.controller('RecipeCtrl', ['$scope',
                          function($scope) {

            $scope.addRecipe = function (recipe) {
                $scope.recipes.push(recipe);
                $scope.$applyAsync();
            };

            $scope.recipeFoundCB = function(recipe) {
                $scope.recipe = recipe;
                if (!recipe) { $scope.showNotice("Fant ikke oppskriften"); return; }

                $scope.transients = {
                    ingredients1: recipe.ingredients.split(INGREDIENTS_COLUMN_BREAK)[0] || "",
                    ingredients2: recipe.ingredients.split(INGREDIENTS_COLUMN_BREAK)[1] || ""
                };
                $scope.$applyAsync();
            };
            $scope.imageFoundCB = function(recipe, image) {
                if (image && image.imageData && !$scope.image.imageData) {
                    $scope.image = image;
                } else if (!$scope.image.imageData) {
                    $scope.image = {};
                }
                $scope.$applyAsync();
            };

            $scope.changeRecipeImage = function() {
                $scope.changeImage($scope.image, function(result) {
                    if (result) $scope.showNotice(result);
                    else        $scope.imageForm.$setDirty();
                });
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

    app.controller('RecipeCreateCtrl',
                        ['$scope', '$controller', '$location', 'StorageService',
                function ($scope,   $controller,   $location,   StorageService) {
            $controller('ParentCtrl', {$scope: $scope});
            $controller('RecipeCtrl', {$scope: $scope});

            $scope.save = function () {
                $scope.editRecipeForm.submitted = true;

                $scope.transients.ingredients1 = $scope.transients.ingredients1 || "";
                $scope.transients.ingredients2 = $scope.transients.ingredients2 || "";
                $scope.recipe.ingredients = $scope.transients.ingredients1 +
                                            INGREDIENTS_COLUMN_BREAK +
                                            $scope.transients.ingredients2;
                StorageService.addRecipe($scope.recipe, $scope.image, function (result) {
                    if (result) { $scope.showNotice(result) }
                    else {
                        $scope.$apply(function() {
                            $location.path("/recipe/view/" + $scope.recipe.$id);
                        });
                    }
                });
            };

            $scope.recipe = {}; $scope.image = {};
        }
    ]);

    app.controller('RecipeEditCtrl',
                        ['$scope', '$controller', '$location', '$routeParams', 'StorageService',
                function ($scope, $controller, $location, $routeParams, StorageService)
        {
            $controller('ParentCtrl', {$scope: $scope});
            $controller('RecipeCtrl', {$scope: $scope});

            $scope.remove = function ()
            {
                var error = "Sletting av '" + $scope.recipe.name + "' feila.";
                var callback = function (result) {
                    if (result) { $scope.showNotice(error); }
                    else {
                        $scope.$apply(function() {
                            $location.path("/recipe/list"); });
                    }
                };
                StorageService.removeRecipe($scope.recipe, callback);
            };

            $scope.save = function ()
            {
                $scope.recipe.ingredients = $scope.transients.ingredients1 +
                                            INGREDIENTS_COLUMN_BREAK +
                                            $scope.transients.ingredients2;

                $scope.editRecipeForm.submitted = true;
                if ($scope.editRecipeForm.$valid) {
                    if (!$scope.image.imageData) {
                        $scope.recipe.imageId = null;
                    }
                    var imageDirty = $scope.imageForm.$dirty;
                    var error = "Oppdatering av '" + $scope.recipe.name + "' feila.";
                    if ($scope.image) {
                        $scope.recipe.imageTimestamp = Date.now();
                    }
                    StorageService.updateRecipe($scope.recipe, $scope.image, function(result) {
                        if (result) {
                            $scope.showNotice(error);
                        } else if (imageDirty) {
                            StorageService.updateImage($scope.image, function(result) {
                                if (result) {
                                    $scope.showNotice(error);
                                } else {
                                    $scope.$apply(function() {
                                        $location.path('recipe/view/' + $scope.recipe.$id); });
                                }
                            });
                        } else {
                            $scope.$apply(function() {
                                $location.path('recipe/view/' + $scope.recipe.$id); });
                        }
                    });
                }
                else {
                    window.scrollTo(0, 0);
                }
            };

            $scope.recipe = {}; $scope.image = {};
            StorageService.findRecipe($routeParams.recipeId, $scope.recipeFoundCB, $scope.imageFoundCB);
        }
    ]);

    app.controller('RecipeViewCtrl',
                        ['$scope', '$controller', '$routeParams', 'StorageService',
                function ($scope,   $controller,   $routeParams,   StorageService)
        {
            $controller('ParentCtrl', {$scope: $scope});
            $controller('RecipeCtrl', {$scope: $scope});

            $scope.recipe = {}; $scope.image = {};
            StorageService.findRecipe($routeParams.recipeId, $scope.recipeFoundCB, $scope.imageFoundCB);
        }
    ]);
}


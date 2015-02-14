
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
                    $rootScope.recipe = recipe;
                };
                var imageFoundCB = function(image) {
                    $scope.image = $scope.image.imageData ? $scope.image : image;
                    $scope.$applyAsync();
                    $rootScope.image = $scope.image;
                };

                if (!$rootScope.recipe || $rootScope.recipe.$id != recipeId) {
                    debugMsg("Looking up recipe in backend");
                    StorageService.findRecipe(recipeId,
                        recipeFoundCB,
                        imageFoundCB
                    );
                }
                else {
                    debugMsg("Found recipe in local storage");
                    $scope.recipe = $rootScope.recipe;
                    $scope.transients = {
                        ingredients1: $scope.recipe.ingredients.split(INGREDIENTS_COLUMN_BREAK)[0] || "",
                        ingredients2: $scope.recipe.ingredients.split(INGREDIENTS_COLUMN_BREAK)[1] || ""
                    };
                    if ($rootScope.image && $rootScope.image.recipeID == $scope.recipe.$id) {
                        $scope.image = $rootScope.image;
                    } else {
                        StorageService.findImage($scope.recipe, imageFoundCB);
                    }
                    $scope.$applyAsync();
                }
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

            $scope.imageAdded = function(image) {
                if (image == null) return;

                var recipe = findRecipeById($scope.recipes, image.recipeID);
                if (recipe != null) {
                    recipe.imageData = image.imageData;
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

    app.controller('RecipeCreateCtrl', ['$scope', '$controller', '$location', 'StorageService',
        function ($scope, $controller, $location, StorageService) {
            $controller('ParentCtrl', {$scope: $scope});

            $scope.save = function () {
                $scope.editRecipeForm.submitted = true;

                $scope.recipe.ingredients = $scope.transients.ingredients1 +
                                            INGREDIENTS_COLUMN_BREAK +
                                            $scope.transients.ingredients2;
                StorageService.addRecipe($scope.recipe, $scope.image, function (recipeId) {
                    $location.path("/recipe/view/" + recipeId);
                });

            };

            $scope.changeRecipeImage = function() { $scope.changeImage($scope.recipe); };

            $scope.recipe = {};
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
                StorageService.removeRecipe($scope.recipe, function (result) {
                    if (result) { alert("Error: " + result); }
                    else { alert("Removed!"); $location.path("/recipe/list"); }
                });
            };

            $scope.save = function ()
            {
                $scope.recipe.ingredients = $scope.transients.ingredients1 +
                                            INGREDIENTS_COLUMN_BREAK +
                                            $scope.transients.ingredients2;

                $scope.editRecipeForm.submitted = true;
                if ($scope.editRecipeForm.$valid) {
                    StorageService.updateRecipe($scope.recipe, $scope.image, $scope.recipeSaved);
                }
                else {
                    window.scrollTo(0, 0);
                }
            };

            $scope.recipeSaved = function (recipeId) {
                $scope.$apply(function() {$location.path('recipe/view/' + recipeId);});
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


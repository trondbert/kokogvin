
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
        }
    ]);

    app.controller('RecipeListCtrl', ['$scope', '$controller', '$routeParams', 'RecipeDAO',
                              function ($scope, $controller, $routeParams, RecipeDAO) {
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
                    RecipeDAO.findByTags(tagList, $scope.addRecipe, $scope.imageAdded);
                } else {
                    RecipeDAO.findAll($scope.addRecipe, $scope.imageAdded);
                }
                $scope.$applyAsync();
            }
        }
    ]);

    app.controller('RecipeCreateCtrl',
                        ['$scope', '$controller', '$location', 'RecipeDAO',
                function ($scope,   $controller,   $location,   RecipeDAO) {
            $controller('ParentCtrl', {$scope: $scope});
            $controller('RecipeCtrl', {$scope: $scope});

            $scope.save = function () {
                $scope.editRecipeForm.submitted = true;

                $scope.transients.ingredients1 = $scope.transients.ingredients1 || "";
                $scope.transients.ingredients2 = $scope.transients.ingredients2 || "";
                $scope.recipe.ingredients = $scope.transients.ingredients1 +
                                            INGREDIENTS_COLUMN_BREAK +
                                            $scope.transients.ingredients2;
                RecipeDAO.updateOrInsert($scope.recipe, $scope.image, function (result) {
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
                        ['$scope', '$controller', '$location', '$routeParams', 'RecipeDAO',
                function ($scope,   $controller,   $location,   $routeParams,   RecipeDAO)
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
                RecipeDAO.remove($scope.recipe, callback);
            };

            $scope.save = function ()
            {
                $scope.recipe.ingredients = $scope.transients.ingredients1 +
                                            INGREDIENTS_COLUMN_BREAK +
                                            $scope.transients.ingredients2;

                $scope.editRecipeForm.submitted = true;
                if (!$scope.editRecipeForm.$valid) {
                    window.scrollTo(0, 0);
                    return;
                }
                if (!$scope.image.imageData) {
                    $scope.recipe.imageId = null;
                }
                var imageDirty = $scope.imageForm.$dirty;
                var imageToUpdate = imageDirty ? $scope.image : null;
                if (imageDirty) {
                    $scope.recipe.imageTimestamp = Date.now();
                }
                RecipeDAO.updateOrInsert($scope.recipe, imageToUpdate, function (result) {
                    if (result) {
                        $scope.showNotice(error);
                    } else {
                        $scope.$apply(function () {
                            $location.path('recipe/view/' + $scope.recipe.$id);
                        });
                    }
                });
            };

            $scope.recipe = {}; $scope.image = {};
            RecipeDAO.findById($routeParams.recipeId, $scope.recipeFoundCB, $scope.imageFoundCB);
        }
    ]);

    app.controller('RecipeViewCtrl',
                        ['$scope', '$controller', '$routeParams', 'RecipeDAO',
                function ($scope,   $controller,   $routeParams,   RecipeDAO)
        {
            $controller('ParentCtrl', {$scope: $scope});
            $controller('RecipeCtrl', {$scope: $scope});

            $scope.recipe = {}; $scope.image = {};
            RecipeDAO.findById($routeParams.recipeId, $scope.recipeFoundCB, $scope.imageFoundCB);
        }
    ]);
}


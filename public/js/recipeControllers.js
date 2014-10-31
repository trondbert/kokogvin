
function addRecipeControllers() {

    app.controller('RecipeListCtrl', ['$scope', '$controller', 'StorageService',
        function ($scope, $controller, StorageService) {
            $controller('ParentCtrl', {$scope: $scope});

            if ($scope.userId) {
                $scope.recipes = StorageService.findAllRecipes();
                console.log("Found all " + $scope.recipes + ".");
            }

            $scope.search = function (item) {
                if (!$scope.query) {
                    return true;
                }
                var haystack = [item.name, item.tags, item.ingredients].join(";").toLowerCase();
                var needle = $scope.query.toLowerCase();

                return haystack.indexOf(needle) != -1;
            };

        }]);

    app.controller('RecipeCreateCtrl', function ($scope, $controller, $location, StorageService) {
        $controller('ParentCtrl', {$scope: $scope});

        $scope.recipe = {};
        $scope.recipes = StorageService.findAllRecipes();

        $scope.save = function () {
            $scope.editRecipeForm.submitted = true;
            if (1 == 1) return;

            StorageService.addRecipe($scope.recipe, $scope.recipes);

            $scope.recipe = {};
            $location.path('/');
        }

        $scope.changeRecipeImage = function() { $scope.changeImage($scope.recipe); };
    });

    app.controller('RecipeEditCtrl', function ($scope, $controller, $location, $routeParams, StorageService) {
        $controller('ParentCtrl', {$scope: $scope});

        $scope.recipe = StorageService.findRecipe($routeParams.recipeId);

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

        $scope.chooseImage = function () {
            $("#recipeImage").trigger('click');
        };

        $scope.changeImage = function () {
            var file = $("#recipeImage")[0].files[0],
                reader = new FileReader();

            reader.onloadend = function (e) {
                var imageBase64 = e.target.result;
                console.log(imageBase64);
                $scope.recipe.image = imageBase64;
                $scope.$apply();
            };

            reader.readAsDataURL(file);
        }
    });

    app.controller('RecipeViewCtrl', function ($scope, $controller, $location, $routeParams, StorageService) {
        $controller('ParentCtrl', {$scope: $scope});
        $scope.recipe = StorageService.findRecipe($routeParams.recipeId);
        console.log("recipe id: " + $scope.recipe.$id);
        $scope.ingredientsWithBreaks = function () {
            return $scope.recipe.ingredients && $scope.recipe.ingredients.replace(/\n/g, '<br/>');
        };
        $scope.instructionsWithBreaks = function () {
            return $scope.recipe.instructions && $scope.recipe.instructions.replace(/\n/g, '<br/>');
        };
    });


}



function addMassUploadController() {

    app.controller('MassUploadCtrl', function ($scope, $controller, $location, StorageService) {
        $controller('ParentCtrl', {$scope: $scope});

        $scope.upload = function () {
            $scope.recipes = StorageService.findAllRecipes();

            var files = $("#filesInput")[0].files;     

            newRecipes.forEach( function(recipe) {
                console.log("Recipe image: " + recipe.imageData);
                var file = getByName(files, recipe.imageData);
                console.log(file);

                var reader = new FileReader();
                reader.onloadend = function (e) {
                    recipe.imageData = e.target.result;
                    StorageService.addRecipe(recipe, $scope.recipes);
                };
                reader.readAsDataURL(file);
            });
        };
    });
}

function getByName(files, name) {
    for (var i = 0; i < files.length; i++) {
        if (files[i].name == name) {
            return files[i];
        }
    }
    return null;
}    

newRecipes = [];
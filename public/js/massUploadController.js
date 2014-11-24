
function addMassUploadController() {

	app.controller('MassUploadCtrl', function ($scope, $controller, $location, StorageService) {
	    $controller('ParentCtrl', {$scope: $scope});

        $scope.upload = function (item) {
        	$scope.recipes = StorageService.findAllRecipes();

			var files = $("#filesInput")[0].files;     

		    newRecipes.forEach( function(recipe) {
		    	console.log("Recipe image: " + recipe.image);
		    	file = getByName(files, recipe.image);
		    	console.log(file);

                reader = new FileReader();
	            reader.onloadend = function (e) {
	                var imageBase64 = e.target.result;
	                recipe.image = imageBase64;
			    	StorageService.addRecipe(recipe, $scope.recipes);
	            };
	            reader.readAsDataURL(file);
		    });
		};
	});
}

function getByName(files, name) {
	for (i = 0; i < files.length; i++) {
		if (files[i].name == name) {
			return files[i];
		}
	}
	return null;
}	

newRecipes = [];
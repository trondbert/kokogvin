
var loggedInState = false;
var mockCredentials = {
    password: {email: "tester@testopia.uk"}
};

function storageServiceMock() {
    this.onAuthCallback = function() {};

    this.findAllRecipes = function (recipeFoundCB, imageAddedFn) {
        this.recipes.forEach(function(recipe) {
            var image = {$id: recipe.imageId, imageData: recipe.imageData };
            recipeFoundCB(recipe);
            imageAddedFn(recipe, image);
        });
        return this.recipes;
    };

    this.findRecipe = function (recipeId, recipeFoundFn, imageFoundFn) {
        var recipe = this.findRecipeById(recipeId);

        recipeFoundFn(recipe);
        imageFoundFn();
        return recipe;
    };

    this.addRecipe = function (recipe, recipes) {
        var numberOfRecipes = Object.keys(recipes).length;
        recipe.$id = '' + (numberOfRecipes + 1);
        recipes[recipe.$id] = recipe;
    };

    this.updateRecipe = function (/*recipe*/) {
        return true;
    };

    this.findRecipeById = function(recipeId) {
        var theRecipe = null;
        this.recipes.forEach(function(item) {
            if (item.$id == recipeId) {
                theRecipe = item;
            }
        });
        return theRecipe;
    };

    this.findAllBeverages = function () {
        return this.beverages;
    };

    this.findBeverage = function (beverageId) {
        return this.findBeverageById(beverageId);
    };

    this.addBeverage = function (beverage, beverages) {
        var numberOfBeverages = beverages.length;
        beverage.$id = '' + (numberOfBeverages + 1);
        beverages[beverage.$id] = beverage;
    };

    this.updateBeverage = function () {
        return true;
    };

    this.findBeverageById = function(beverageId) {
        var theBeverage = null;
        this.beverages.forEach(function(item) {
            if (item.$id == beverageId) {
                theBeverage = item;
            }
        });
        return theBeverage;
    };

    this.loggedIn = function() {
        if (loggedInState) { this.onAuthCallback(mockCredentials); }
        else               { this.onAuthCallback(null); }
        return loggedInState;
    };

    this.authWithPassword = function(credentials, callback) {
        debugMsg("Mocked auth");
        var service = this;
        setTimeout(function() {
            loggedInState = true;
            service.onAuthCallback(mockCredentials);
            callback(null);
        }, 100);
    };

    this.onAuth = function(callback) {
        this.onAuthCallback = callback;
        if (loggedInState) {
            callback(mockCredentials);
        } else {
            callback(null);
        }
    };

    this.logOut = function() {
        loggedInState = false;
    };

    this.recipes = [];
    this.recipes[0] = { $id: '1', name: 'Lasagne', tags: 'pasta',
        ingredients : 'En teskje kardemomme\nEn liter gløgg\n' + INGREDIENTS_COLUMN_BREAK + 'Litt til\nPynt med persille',
        instructions : 'Comme il faut',
        imageId : 'ri0',
        imageData: recipeImageDataMock[0]};
    this.recipes[1] = { $id: '2', name: 'Bacalao', tags: 'fisk tomat',
        ingredients : 'En teskje saft\nEn liter slaggg\n' + INGREDIENTS_COLUMN_BREAK + 'Pynt med hakkede nøtter',
        instructions : 'Just do it',
        imageId : 'ri1',
        imageData: recipeImageDataMock[1]};
    this.recipes[2] = { $id: '3', name: 'Taco', tags: 'meksikansk',
        ingredients : 'To slurker kaffe\nEn hekto gruff\n' + INGREDIENTS_COLUMN_BREAK + 'Passe dose happiness\nJobbe før å få mæ blid',
        instructions : 'Je ne sais pas',
        imageId : 'ri2',
        imageData: recipeImageDataMock[2]};

    this.beverages = [];
    this.beverages[0] = { $id: '1', name: 'Wine Dine 69', comments: 'God', imageData: beverageImageDataMock[0]};
    this.beverages[1] = { $id: '2', name: 'Rioja 123', comments: 'Meget', imageData: beverageImageDataMock[0]};
    this.beverages[2] = { $id: '3', name: 'Valpolicella 23', comments: 'Særs', imageData: beverageImageDataMock[0]};
    this.beverages[3] = { $id: '4', name: 'Rioja Majoralis', comments: 'Noget', imageData: beverageImageDataMock[0]};
}

playController = ['$scope', '$location', 'fbUrls',
    function ($scope, $location, fbUrls) {

    $scope.continueLoop = true;

    $scope.updateRecipes = function() {
        var recipeRef = new Firebase(fbUrls.recipes);
        recipeRef.on("child_added", function(snap) {
            if ($scope.continueLoop) {
                console.log(snap.key());
                console.log(snap.val().name);
                snap.ref().update({ imageTimestamp: Date.now() });
                $scope.continueLoop = false;
            }
        });
    };
    $scope.updateRecipes();
}
];


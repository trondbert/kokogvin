
function storageService($firebase, fbUrls, fbRecipesUrl, fbBeveragesUrl, fbImagesUrl) {

    this.fbRootRef = new Firebase(fbUrls.root);

    this.findAllRecipes = function (imageAddedFn) {
        var recipesRef = new Firebase(fbRecipesUrl);
        var recipes = $firebase(recipesRef).$asArray();
        recipes.$loaded().then(function() {
            var imagesRef = new Firebase(fbImagesUrl);
            imagesRef.on("child_added", imageAddedFn);
        });
        return recipes;
    };

    this.findRecipe = function (recipeId, imageFoundFn) {
        var service = this;
        var recipe = $firebase(new Firebase(fbRecipesUrl + '/' + recipeId)).$asObject();
        recipe.$loaded().then(function() {
            recipe.ingredients1 = recipe.ingredients.split(INGREDIENTS_COLUMN_BREAK)[0];
            recipe.ingredients2 = recipe.ingredients.split(INGREDIENTS_COLUMN_BREAK)[1];
            recipe.ingredients1 = recipe.ingredients1 || "";
            recipe.ingredients2 = recipe.ingredients2 || "";
            service.findImage(recipe, imageFoundFn);
        });
        return recipe;
    };

    this.addRecipe = function (recipe) {
        var recipesRef = new Firebase(fbRecipesUrl);
        var newRecipe = {   "name": recipe.name,
            "tags": recipe.tags,
            "instructions": recipe.instructions,
            "ingredients": recipe.ingredients1 + INGREDIENTS_COLUMN_BREAK + recipe.ingredients2,
            "portions": recipe.portions
        };
        this.setSpecialTags(newRecipe);
        var newRecipeRef = recipesRef.push(newRecipe);
        recipe.$id = newRecipeRef.key();

        if (recipe.image) {
            this.updateOrInsertImageForRecipe(recipe);
        } else {
            //TODO: delete image
        }
        return recipe.$id;
    };

    this.updateRecipe = function (recipe) {
        var recipeRef = $firebase(new Firebase(fbRecipesUrl + "/" + recipe.$id));
        var service = this;
        recipeRef.$transaction(function (currentRecipe) {
            currentRecipe.name = recipe.name;
            currentRecipe.tags = recipe.tags;
            currentRecipe.instructions = recipe.instructions;
            currentRecipe.ingredients = recipe.ingredients1 + INGREDIENTS_COLUMN_BREAK + recipe.ingredients2;
            currentRecipe.portions = recipe.portions;
            service.setSpecialTags(currentRecipe);
            return currentRecipe;
        }).then(function (snapshot) { snapshot || console.log("Error"); },
            function (err) { console.log(err);
            }
        );

        if (recipe.image ) {
            this.updateOrInsertImageForRecipe(recipe);
        } else {
            //TODO: delete image
        }
    };
    this.removeRecipe = function (recipe, callbackFn) {
        var recipeRef = new Firebase(fbRecipesUrl + "/" + recipe.$id);
        recipeRef.remove(callbackFn);
    };

    this.findRecipesByTags = function(tags, recipeFoundCB, imageFoundCB) {
        var service = this, recipes = [];
        var recipesRef = new Firebase(fbRecipesUrl);
        recipesRef
            .orderByChild("tag_middag")
            .startAt(true)
            .endAt(true)
            .once("value", function(snap) {
                if (!snap.val()) return;

                Object.keys(snap.val()).forEach(function(key) {
                    var recipe = snap.val()[key];
                    debugMsg("Found recipe: " + recipe);
                    recipe.$id = key;
                    recipes.push(recipe);
                    recipeFoundCB();
                    service.findImage(recipe, imageFoundCB);
                });
            });
        return recipes;
    };

    this.findAllBeverages = function () {
        var beveragesRef = new Firebase(fbBeveragesUrl);
        return $firebase(beveragesRef).$asArray();
    };
    this.findBeverage = function (beverageId) {
        console.log("finding beverage " + beverageId);
        return $firebase(new Firebase(fbBeveragesUrl + '/' + beverageId)).$asObject();
    };
    this.addBeverage = function (beverage, beverages) {
        beverages.$add(beverage);
    };
    this.updateBeverage = function (beverage) {
        var beverageRef = $firebase(new Firebase(fbBeveragesUrl + "/" + beverage.$id));
        beverageRef.$transaction(function (currentBeverage) {
            currentBeverage.name = beverage.name;
            currentBeverage.image = beverage.image;
            currentBeverage.comments = beverage.comments;
            return currentBeverage;
        }).then(function (snapshot) {
                if (!snapshot) {
                    console.log("Error");
                }
            }
            , function (err) {
                console.log(err);
            });
    };

    this.setSpecialTags = function(recipe) {
        recipe.tag_middag = !!/middag/.test(recipe.tags);
        recipe.tag_fisk = !!/fisk/.test(recipe.tags);
        recipe.tag_kjøtt = !!/kjøtt/.test(recipe.tags);
    };

    this.findImage = function(recipe, callbackFn) {
        var imagesRef = new Firebase(fbImagesUrl);
        return imagesRef
            .orderByChild("recipeID")
            .startAt(recipe.$id)
            .endAt(recipe.$id)
            .limitToFirst(1)
            .once('value', function (snap) { callbackFn(snap, imagesRef); });
    };

    this.updateOrInsertImageForRecipe = function(recipe) {
        this.findImage(recipe, function saveImage(snap, imagesRef) {
            var imageRef = snap.val();
            if (imageRef) {
                imageRef[Object.keys(imageRef)[0]].image = recipe.image;
                imagesRef.update(imageRef);
            } else {
                imageRef = imagesRef.push();
                imageRef.set({
                    "recipeID": recipe.$id,
                    "image": recipe.image
                });
            }
        });
    };

    (function util() {}(this.deleteDefaultImages));
    this.deleteDefaultImages = function () {
        var imagesRef = new Firebase(fbImagesUrl);

        var images = $firebase(imagesRef).$asArray();

        images.$loaded().then( function() {
            images.forEach( function(img) {
               if (img.image == placeholderImage || img.image == defaultImageDataOld) {
                   console.log("Match");
                   var recipeRef = new Firebase(fbImagesUrl + "/" + img.$id);
                   recipeRef.remove();
               }
            });
        });
    };

    this.loggedIn = function() {
        return this.fbRootRef.getAuth();
    };
    this.authWithPassword = function(credentials, callback) {
        this.fbRootRef.authWithPassword(credentials, callback);
    };
    this.onAuth = function(callback) {
        this.fbRootRef.onAuth(callback);
    };
    this.logOut = function() {
        this.fbRootRef.unauth();
    };

}


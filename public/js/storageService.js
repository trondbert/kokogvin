
function storageService($firebase, fbUrls) {

    this.fbRootRef = new Firebase(fbUrls.root);

    this.findAllRecipes = function (recipeFoundCB, imageAddedFn) {
        var service = this;
        var recipesRef = new Firebase(fbUrls.recipes);
        recipesRef.on("child_added", function(recipeSnap) {
            var recipe = recipeSnap.val();
            recipe.$id = recipeSnap.key();
            recipeFoundCB(recipe);
            service.findImage(recipe, imageAddedFn);
        });
    };

    this.findRecipe = function (recipeId, recipeFoundFn, imageFoundFn) {
        var service = this;
        var recipeRef = new Firebase(fbUrls.recipes + '/' + recipeId);
        recipeRef.on("value", function(snap) {
            var recipe = snap.val();
            recipe.$id = snap.key();
            recipeFoundFn(recipe);
            service.findImage(recipe, imageFoundFn);
        });
    };

    this.addRecipe = function (recipe, image, callbackFn) {
        var recipesRef = new Firebase(fbUrls.recipes);
        var newRecipe = {   "name": recipe.name,
            "tags": recipe.tags,
            "instructions": recipe.instructions,
            "ingredients": recipe.ingredients,
            "portions": recipe.portions || ""
        };
        this.setSpecialTags(newRecipe);
        var newRecipeRef = recipesRef.push(newRecipe);
        recipe.$id = newRecipeRef.key();

        if (image.imageData) {
            this.updateOrInsertImageForRecipe(recipe, image, callbackFn);
        } else {
            callbackFn(recipe.$id);
        }
    };

    this.updateRecipe = function (recipe, image, callbackFn) {
        var recipeRef = new Firebase(fbUrls.recipes + "/" + recipe.$id);
        var service = this;
        recipeRef.transaction(function(currentRecipe) {
                currentRecipe.name = recipe.name;
                currentRecipe.tags = recipe.tags;
                currentRecipe.instructions = recipe.instructions;
                currentRecipe.ingredients = recipe.ingredients;
                currentRecipe.portions = recipe.portions;
                service.setSpecialTags(currentRecipe);
                return currentRecipe;
            },
            function(error, committed, snapshot) {
                if (error) {
                    console.log("Error in updating recipe: " + error);
                }
                else if (!committed) {
                    console.log("Error in updating recipe: operation was not committed");
                }
                else if (snapshot) {
                    if (image.imageData) {
                        service.updateOrInsertImageForRecipe(recipe, image, callbackFn);
                    } else {
                        callbackFn(recipe.$id);
                        //TODO: delete image
                    }
                }
            }
        );
    };

    this.removeRecipe = function (recipe, callbackFn) {
        var recipeRef = new Firebase(fbUrls.recipes + "/" + recipe.$id);
        recipeRef.remove(callbackFn);
    };

    this.findRecipesByTags = function(tags, recipeFoundCB, imageFoundCB) {
        var service = this;
        var firstTag = tags[0];
        var recipesRef = new Firebase(fbUrls.recipes);
        debugMsg("tag_"  + firstTag);
        recipesRef
            .orderByChild("tag_"  + firstTag)
            .startAt(true)
            .endAt(true)
            .once("value", function(snap) {
                if (!snap.val()) return;

                Object.keys(snap.val()).forEach(function(key) {
                    var recipe = snap.val()[key];
                    if (!utils.containsAllTags(recipe, tags)) return;

                    recipe.$id = key;
                    recipeFoundCB(recipe);
                    service.findImage(recipe, imageFoundCB);
                });
            });
    };

    this.findAllBeverages = function () {
        var beveragesRef = new Firebase(fbUrls.beverages);
        return $firebase(beveragesRef).$asArray();
    };
    this.findBeverage = function (beverageId) {
        console.log("finding beverage " + beverageId);
        return $firebase(new Firebase(fbUrls.beverages + '/' + beverageId)).$asObject();
    };
    this.addBeverage = function (beverage, beverages) {
        beverages.$add(beverage);
    };
    this.updateBeverage = function (beverage) {
        var beverageRef = $firebase(new Firebase(fbUrls.beverages + "/" + beverage.$id));
        beverageRef.$transaction(function (currentBeverage) {
            currentBeverage.name = beverage.name;
            currentBeverage.imageData = beverage.imageData;
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
        recipe.tag_kjoett = !!/kjøtt/.test(recipe.tags);
    };

    this.findImage = function(recipe, callbackFn) {
        var cachedImage = localCache.findImage(recipe.imageId);
        if (cachedImage) {
            callbackFn(recipe, cachedImage);
            return;
        }
        this.findFirebaseImage(recipe, callbackFn);
    };

    this.findFirebaseImage = function(imageHolder, callbackFn) {
        var imageId = imageHolder.imageId;
        if (!imageId) { callbackFn(imageHolder, null); return; }

        var imageRef = new Firebase(fbUrls.images + "/" + imageId);
            imageRef.on('value', function (snap) {
                var image = snap.val();
                if (image && image.imageData) {
                    image.$id = imageId;
                    localCache.storeImage(image);
                } else {
                    localCache.removeImage(imageId);
                }

                callbackFn(imageHolder, image);
            });
    };

    this.updateOrInsertImageForRecipe = function(recipe, image, callbackFn) {
            if (image.$id) {
                var imageRef = new Firebase(fbUrls.images + "/" + image.$id);
                imageRef.transaction(function(currentImage) {
                        currentImage.imageData = image.imageData;
                        return currentImage;
                    },
                    function(error, committed, snapshot) {
                        if (error)
                            console.log("Error in updating image: " + error);
                        else if (!committed)
                            console.log("Error in updating image: operation was not committed");
                        else if (snapshot) {
                            callbackFn();
                        }
                        else
                            console.log("UpdateRecipe: No snapshot?!");
                    }
                );
            } else if (image.imageData) {
                var imagesRef = new Firebase(fbUrls.images);
                var newImage = imagesRef.push();
                newImage.set({
                    "imageData": image.imageData
                });
                image.$id = newImage.key();
            }
            new Firebase(fbUrls.recipes + "/" + recipe.$id).transaction(function(currentRecipe) {
                currentRecipe.imageId = image.$id;
                return currentRecipe;
            },
                function(error, committed, snapshot) {
                    if (error)
                        console.log("Error in updating recipe: " + error);
                    else if (!committed)
                        console.log("Error in updating recipe: operation was not committed");
                    else if (snapshot) {
                        callbackFn();
                    }
                    else
                        console.log("UpdateRecipe: No snapshot?!");
                }
            );
            localCache.storeImage(image);
            callbackFn();
    };

    (function util() {}(this.deleteDefaultImages));
    this.deleteDefaultImages = function () {
        var imagesRef = new Firebase(fbUrls.images);

        var images = $firebase(imagesRef).$asArray();

        images.$loaded().then( function() {
            images.forEach( function(img) {
               if (img.imageData == placeholderImage || img.imageData == defaultImageDataOld) {
                   console.log("Match");
                   var recipeRef = new Firebase(fbUrls.images + "/" + img.$id);
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


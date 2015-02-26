
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
            if (!recipe) { recipeFoundFn(null); return;}
            recipe.$id = snap.key();
            recipeFoundFn(recipe);
            service.findImage(recipe, imageFoundFn);
        });
    };

    this.addRecipe = function (recipe, image, callbackFn) {
        var service = this;

        var saveNewRecipe = function (imageId) {
            if (image.imageData && !imageId) { errorMsg("Feila i lagring av bilde."); }
            var recipesRef = new Firebase(fbUrls.recipes);
            var newRecipe = service.private.dataMap(recipe);
            newRecipe.imageId = imageId;

            var newRecipeRef = recipesRef.push(newRecipe, function(result) {
                if (result) {callbackFn(result);}
            });
            recipe.$id = newRecipeRef.key();
            callbackFn();
        };

        if (image.imageData) {
            this.updateOrInsertImage(image, saveNewRecipe);
        } else {
            saveNewRecipe(null);
        }
    };

    this.updateRecipe = function (recipe, image, callbackFn) {
        var callbackUpdateRecipe = function(imageId) {
            var recipeRef = new Firebase(fbUrls.recipes + "/" + recipe.$id);
            var dataMap = service.private.dataMap(recipe);
            dataMap.imageId = imageId;
            recipeRef.update(dataMap, function(result) { callbackFn(result); } );
        };

        var service = this;
        if (image.imageData) {
            service.updateOrInsertImage(image, callbackUpdateRecipe);
        } else {
            if (recipe.imageId && !image.imageData) {
                var imgRef = new Firebase(fbUrls.images + "/" + recipe.imageId);
                imgRef.remove();
            }
            callbackUpdateRecipe(null);
        }
    };

    this.updateImage = function(image, callbackFn) {
        this.updateOrInsertImage(image, function(imageId) {
            if (!imageId) {
                callbackFn("Lagring av bilde feila.");
            } else {
                callbackFn();
            }
        })
    };

    this.removeRecipe = function (recipe, recipeDeletedFn) {
        if (recipe.imageId) {
            var imgRef = new Firebase(fbUrls.images + "/" + recipe.imageId);
            imgRef.remove();
        }
        var recipeRef = new Firebase(fbUrls.recipes + "/" + recipe.$id);
        recipeRef.off();
        recipeRef.remove(recipeDeletedFn);
    };

    this.findRecipesByTags = function(tags, recipeFoundCB, imageFoundCB) {
        var service = this;
        var firstTag = tags[0];
        var recipesRef = new Firebase(fbUrls.recipes);
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

    this.private = {};
    this.private.dataMap = function(recipe) {
        var specialTags = this.specialTags(recipe);
        var theMap =
        {   name: recipe.name,
            imageId: recipe.imageId,
            portions: recipe.portions || "",
            instructions: recipe.instructions,
            ingredients: recipe.ingredients,
            tags: recipe.tags,
            tag_middag: specialTags.tag_middag,
            tag_fisk: specialTags.tag_fisk,
            tag_kjoett: specialTags.tag_kjoett,
            tag_vegetar: specialTags.tag_vegetar,
            tag_smarett: specialTags.tag_smarett
        };
        return theMap;
    };
    this.private.specialTags = function(recipe) {
        var tags = {
            tag_middag : !!/middag/.test(recipe.tags),
            tag_fisk   : !!/fisk/.test(recipe.tags),
            tag_kjoett : !!/kjøtt/.test(recipe.tags),
            tag_vegetar : !!/vegetar/.test(recipe.tags),
            tag_smarett : !!/smårett/.test(recipe.tags)
        };
        return tags;
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

    /* Calls callback with image ID if it exists */
    this.updateOrInsertImage = function(image, callbackFn) {
        var imageRef = null;
        if (image.$id) {
            imageRef = new Firebase(fbUrls.images + "/" + image.$id);
        } else {
            var imagesRef = new Firebase(fbUrls.images);
            var imageSnap = imagesRef.push();
            image.$id = imageSnap.key();
            imageRef = imageSnap.ref();
        }
        imageRef.update({ imageData: image.imageData },
            function(result) {
                if (result) {
                    errorMsg(result);
                    callbackFn(null);
                }
                else {
                    callbackFn(image.$id);
                    localCache.storeImage(image);
                }
            }
        );
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


/*function inherit(proto) {
    function F() {};
    F.prototype = proto;
    return new F;
}
var Rabbit = inherit(Animal.prototype) */

Function.prototype.extend = function(parent) {
    var child = this;
    child.prototype = parent;
    // TODO Need this? child.prototype.constructor = child;
};

var GenericDAO = {
    findAll: function (callback) {
        var ref = new Firebase(this.baseUrl);
        ref.on("child_added", function (snap) {
            var entity = snap.val();
            entity.$id = snap.key();
            callback(entity);
        });
    },
    findByTags: function (tags, callback) {
        var firstTag = tags[0];
        var ref = new Firebase(this.baseUrl);
        ref.orderByChild("tag_" + firstTag)
            .startAt(true)
            .endAt(true)
            .on("child_added", function (snap) {
                var entity = snap.val();
                entity.$id = snap.key();
                callback(entity);
            });
    },

    findById : function (id, callback) {
        if (!id) { callback(null); return; }

        var ref = new Firebase(this.baseUrl  + id);
        ref.on("value", function(snap) {
            var entity = snap.val();
            entity && (entity.$id = snap.key());
            callback(entity);
        });
    },

    updateOrInsert : function(entity, callback) {
        var ref = null;
        if (entity.$id) {
            ref = new Firebase(this.baseUrl + entity.$id);
        } else {
            var baseRef = new Firebase(this.baseUrl);
            var snap = baseRef.push();
            entity.$id = snap.key();
            ref = snap.ref();
            entity.dateCreated = utils.dateToString(new Date());
        }
        var dataMap = this.getDataMap(entity);
        dataMap.dateModified = utils.dateToString(new Date());
        dataMap.dateCreated = entity.dateCreated || utils.dateToString(new Date());
        ref.update(dataMap,
            function (result) {
                if (result) {
                    errorMsg(result);
                }
                callback(result);
            }
        );
    },
    remove : function (entity, callback) {
        var ref = new Firebase(this.baseUrl + entity.$id);
        ref.off();
        ref.remove(callback);
    }
};

function setupDAOs() {

    window.RecipeDAO = function(fbUrls) {
        this.imageDAO = ImageDAO.instance || new ImageDAO(fbUrls);
        this.baseUrl = fbUrls.recipes + "/";

        this.findAll = function (recipeFoundCB, imageAddedFn) {
            var thiz = this;
            GenericDAO.findAll.call(thiz, function (recipe) {
                recipeFoundCB(recipe);
                thiz.imageDAO.findById(recipe.imageId, recipe.imageTimestamp, function (image) {
                    imageAddedFn(recipe, image);
                });
            })
        };
        this.findByTags = function (tags, recipeFoundCB, imageFoundCB) {
            var thiz = this;
            GenericDAO.findByTags.call(this, tags, function (recipe) {
                if (!utils.containsAllTags(recipe, tags)) return;
                recipeFoundCB(recipe);
                thiz.imageDAO.findById(recipe.imageId, recipe.imageTimestamp, function (image) {
                    imageFoundCB(recipe, image);
                });
            });
        };
        this.findById = function (recipeId, recipeFoundFn, imageFoundFn) {
            var thiz = this;
            GenericDAO.findById.call(thiz, recipeId, function (recipe) {
                recipeFoundFn(recipe);
                thiz.imageDAO.findById(recipe.imageId, recipe.imageTimestamp, function (image) {
                    imageFoundFn(recipe, image);
                });
            });
        };

        this.updateOrInsert = function (recipe, image, callback) {
            var thiz = this;
            if (image && image.imageData) {
                this.imageDAO.updateOrInsert(image, function (result) {
                    if (result) { callback(result); return; }
                    recipe.imageId = image.$id;
                    GenericDAO.updateOrInsert.call(thiz, recipe, callback);
                });
            } else {
                GenericDAO.updateOrInsert.call(thiz, recipe, callback);
            }
        };

        this.remove = function(recipe, callback) {
            if (recipe.imageId) {
                this.imageDAO.remove({$id : recipe.imageId}, function() {});
            }
            GenericDAO.remove.call(this, recipe, callback);
        };

        this.getDataMap = function (recipe) {
            return Recipes.dataMap(recipe);
        }
    };
    window.BeverageDAO = function(fbUrls) {
        this.imageDAO = ImageDAO.instance || new ImageDAO(fbUrls);
        this.baseUrl = fbUrls.beverages + "/";

        this.findAll = function (beverageFoundCB, imageAddedFn) {
            var thiz = this;
            GenericDAO.findAll.call(thiz, function (beverage) {
                beverageFoundCB(beverage);
                thiz.imageDAO.findById(beverage.imageId, beverage.imageTimestamp, function (image) {
                    imageAddedFn(beverage, image);
                });
            })
        };
        this.findByTags = function (tags, beverageFoundCB, imageFoundCB) {
            var thiz = this;
            GenericDAO.findByTags.call(this, tags, function (beverage) {
                if (!utils.containsAllTags(beverage, tags)) return;
                beverageFoundCB(beverage);
                thiz.imageDAO.findById(beverage.imageId, beverage.imageTimestamp, function (image) {
                    imageFoundCB(beverage, image);
                });
            });
        };
        this.findById = function (beverageId, beverageFoundFn, imageFoundFn) {
            var thiz = this;
            GenericDAO.findById.call(thiz, beverageId, function (beverage) {
                beverageFoundFn(beverage);
                thiz.imageDAO.findById(beverage.imageId, beverage.imageTimestamp, function (image) {
                    imageFoundFn(beverage, image);
                });
            });
        };

        this.updateOrInsert = function (beverage, image, callback) {
            var thiz = this;
            if (image && image.imageData) {
                this.imageDAO.updateOrInsert(image, function (result) {
                    if (result) { callback(result); return; }
                    beverage.imageId = image.$id;
                    GenericDAO.updateOrInsert.call(thiz, beverage, callback);
                });
            } else {
                GenericDAO.updateOrInsert.call(thiz, beverage, callback);
            }
        };

        this.remove = function(beverage, callback) {
            if (beverage.imageId) {
                this.imageDAO.remove({$id : beverage.imageId}, function() {});
            }
            GenericDAO.remove.call(this, beverage, callback);
        };

        this.getDataMap = function (beverage) {
            return Beverages.dataMap(beverage);
        }
    };
    window.ImageDAO = function(fbUrls) {
        this.baseUrl = fbUrls.images + "/";
        ImageDAO.instance = this;

        this.findById = function(id, timestamp, callback) {
            var localImg = localCache.findCachedImage(id, timestamp);
            if (localImg) { callback(localImg); }
            else {
                GenericDAO.findById.call(this, id, function (img) {
                    callback(img);
                    if (img) {
                        localCache.storeCachedImage(img);
                        debugMsg("Image size: " + img.imageData.length + " - " + img.$id);
                    }
                    else if (id)
                        localCache.removeCachedImage(id);
                });
            }
        };

        this.updateOrInsert = function(image, callback) {
            GenericDAO.updateOrInsert.call(this, image, callback);
            localCache.storeCachedImage(image);
        };

        this.remove = function(image, callback) {
            GenericDAO.remove.call(this, image, callback);
            localCache.removeCachedImage(image.$id);
        };

        this.getDataMap = function (image) {
            return Images.dataMap(image);
        };
    };
    RecipeDAO.extend(GenericDAO);
    BeverageDAO.extend(GenericDAO);
    ImageDAO.extend(GenericDAO);
}


function LoginService(fbUrls) {

    this.fbRootRef = new Firebase(fbUrls.root);

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

var Recipes = {

    dataMap : function(recipe) {
        var special_tags = this.specialTags(recipe);
        var theMap = {
            name: recipe.name || "",
            imageId: recipe.imageId || null,
            imageTimestamp: recipe.imageTimestamp || 0,
            portions: recipe.portions || "",
            instructions: recipe.instructions || "",
            ingredients: recipe.ingredients || "",
            tags: recipe.tags || "",
            tag_middag: special_tags.tag_middag || false,
            tag_fisk: special_tags.tag_fisk || false,
            tag_kjoett: special_tags.tag_kjoett || false,
            tag_vegetar: special_tags.tag_vegetar || false,
            tag_smarett: special_tags.tag_smarett || false
        };
        return theMap;
    },
    specialTags : function(recipe) {
        var tags = {
            tag_middag: !!/middag/.test(recipe.tags),
            tag_fisk: !!/fisk/.test(recipe.tags),
            tag_kjoett: !!/kjøtt/.test(recipe.tags),
            tag_vegetar: !!/vegetar/.test(recipe.tags),
            tag_smarett: !!/smårett/.test(recipe.tags)
        };
        return tags;
    }
};

var Beverages = {
    dataMap : function(beverage) {
        return { imageId : beverage.imageId     || null,
                 name : beverage.name           || "",
                 comments : beverage.comments   || ""
        };
    }
};

var Images = {
    dataMap : function(image) {
        return { imageData : image.imageData };
    }
};
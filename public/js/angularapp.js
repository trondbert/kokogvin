
app = {};

var defaultImageData = "data:image/jpeg;base64,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AAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAGf/aAAwDAQACEQMRAD8A/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9D95KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0f3kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9P95KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooprbipCnDY4PvQBzWu+MfD3h1xBqNzm4YZEMSmSUj1Kr0HucVzC/FXRWfBsLxU/vFI/5eZn9K88sfA3iWS8eC4t2+0SMWmuJD8rserlu+ewH0xXWT/DK8jtmkgvElmUZCbSAx9Ac/0oA9L0fxDpOvRGTTZxIU+8jAq6/VTg/j0rar5a0XUpdO1C11K2bDIw/FTwQfYivqUEEZHQ0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//U/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAIbq4jtLWa7lzsgRpGwMnCjJx+ArwnUfiZr2qWrRaZaR6dHMpxIzGWZVPcAAKrY784r3mWNJonhkGVkBUj2Iwa8s0D4btpt8H1SSO7tYQQi4Pz9gWHQY/nQB594V8O3Oq3lvbW6N9mhK+ZIegVff1NfS/A4HSooYIbeMQ26LEi9FUAAfgKloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//V/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOc8XT6lbeGdRn0kkXSxHYVGWXPBYe4GSK8N8HSX1tr9n9gmlkeWQCTLs/mKfvF8k545z2r6VqrBY2VtI0ttbxxO/3mRApP1IoAtUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//W/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAqX1/Y6Zbm71G4jtYV4LyMEXJ7ZOKw/+E28If9Bm0/7+rXjnxA1Aat4rktj80GkqsSA9POcbnbHqAQufauUwPSgD6O/4Tbwh/wBBm0/7+rR/wm3hD/oM2n/f1a+cvl9KPl9KAPo3/hNvCH/QZtP+/q0q+NPCLEKNZtMnj/XLXzj8vpRhT2oA+sldJEWSNgysMgg5BHqDTq8z+Gmo+dp8+lOebVg6D0R+w+hH616ZQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9f95KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKUAnoK878deMpvDyw6bpaq+pXQLguMpFGDguw7knhR379K8WuL/AFe9cy3+pXU7nr+9ZFH0VCFA+goA+rtrehrG17XLDw5p0mpak+xEGFX+KR+yKOpJNfMe+5/5+rj/AL/Sf/FVE0YkkWadmmdPumR2crnrgsTigBImnlD3N1zPcO0sn+/ISx/nUtFOCszBUG4t0A5zQA2iupsvBniO+QSJaGJD0MpCfoef0rUb4ceIgu4GBj6CQ5/VaAOCorc1Hw3relAve2jqg6uvzr+a5rDoA6XwnrMeia1FdXDFYHBjkI5wrd/wODX0ZC6TxLNAwkjcZDKcgj2Ir5OpQ0qLtimljA7JI6D8gQKAPrXa3oaaRjg18mb7n/n6uP8Av9J/8VWzpfiPXdHlWS0vZXQdYpmMkZ/BiSPqCKAPpqisfQdZh13TY9QhXYW+V0/uuOo/qPatigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/Q/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPnr4g8+M7gn+G2twPp85rkK6/4gf8AI5XP/Xtb/wDs9chQAUUUUAaOlaXd6xeJY2S7nfkk9FUdSfYV77oHhXTNBiBjQTXOPmmYfNn/AGfQVS8EaIuk6Qk8i/6TdgO5PUKfur+XP1rY8Qa/YeG9MfU9QJKghUReXkc9EUep/QcmgDb70AZ4FfMmreKfEmvuXvbp7O3P3ba2YooHbc4wzH8QPQVhxIYXEkMkkbj+JZHDfnnNAH1ufQ15z4o8CW1/G99oyCG6AyYxwkn0HRW/Q9647w7481PTJUt9Wka9sycFm5lT3B/iA9Dz6Gvc4ZY54knhYPHIAysOQQehFAHygysjMkilWQkMDwQR1B9xV3TLNdQ1G2sWfYJ5FQt6Amu/+JOiJa3MOuW67UuD5c2P+emPlb8QMH8K8zVirBlJBByCOCKAPcdb8E6BDolzJaxeRLbRPIsm4kkoufmycEHHNeFRuJI1cdGAP51tal4i8RatZHTL6/ZrRxh1VVVpF/us4GSD36Z71kAADAoA9o+GBJ0y9HYTj/0EV6ZXmfww/wCQZff9dx/6AK9MoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//R/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPnr4gf8jlc/wDXtb/+z1yFdf8AED/kcrn/AK9rf/2euQoAKvaZbC81G1tT0mlRT+LAVRrT0WZbfWLKd+FSaMn6bhQB9QgBQAvAHA+lfPvxFv5L/wAVfYWJ8jS4l2r282Ybmb6hcAfjX0FXzv48tHtfF13Kwwl2kUqH1AXYfyK0AcnRRRQAV7f8NtQe40iaxkOfsj/L7K/OPwOa8Qr2T4Y2rpZXl2wwsrqi++wZP86AOm8b2q3XhPU0P3o4TMvsYvn/AKV86A5APrX0h4yuEtfCerzOcD7LKo+rrtH6kV83IMIoPYCgB1FFFAHtHww/5Bl9/wBdx/6AK9MrzP4Yf8gy+/67j/0AV6ZQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/9L95KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA+eviB/yOVz/ANe1v/7PXIV1/wAQP+Ryuf8Ar2t//Z65CgAo57cGiigD6W8M6vHrOjwXYOZVGyUejrwfz6iqHi7wyniKyXySI7y3y0THoc9UPsf0NeO+GPEc/h2983BktpcCWMdx2Ye4/XpX0Hp+oWeqWqXlhKJoX6MOx9COx9jQB8wXdndWE7Wt7E0MqdVYYP4eo9xVavqm7sLHUI/KvoEnUdnUH8vSsePwh4ajfzF0+PPvkj8iSKAPCdE8P6hr1wIrRCIwfnlI+RR9e59hX0Xpun2+lWMWn2gxHEMD1J7k+5NWooooUEUKCNF6KoAA+gFc14p8W6d4WtA9x++u5QfIt1PzyN/7Ko7sePx4oA434qawn2a18NQtmS6YTTAfwwxnIz/vOB+ANeTUs095fXk+p6m4lu7pt0hH3QBwqL6Ko4FJQAUUUUAe0fDD/kGX3/Xcf+gCvTK8z+GH/IMvv+u4/wDQBXplABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//T/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPnz4gqV8YXDHgNbW+Pw3iuOr3fxv4Vk12OK/sAPttspXaePMjJztz6g8j8RXh9xa3VpIYrqF4XHUOpB/WgCCilwaMGgBKvafqeo6TP9p0y4a3c9ccq3+8p4NUsGjBoA9Ms/ijfxKF1LTknI/igfYT/AMBbI/8AHq0G+K9kF+TSblm9C8YH55ryPBowaAO41L4leJL1TFp0EOmoeN5Pny/hkBAfwNcHtd53u7mR7i5l+/LK252/E9vbpUmDRg0AJRS4NGDQAlFLg1qaZomqavMIbGBmz1cjCKPUnpQB6p8MVI0u9bsZxj/vkV6XWPoOjxaHpkWnxHcVyzt/ec9T/h7VsUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//1P3kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoPPUZoooATC+g/KjC+g/KlooATC+g/KjC+g/KlooATC+g/KjC+g/KlooATC+g/KjC+g/KlooATC+g/KjC+g/KlooATC+g/Kl6DA4oooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9X95KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1v3kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9D95KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0f3kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z";

function configApp() {
    app = angular.module('angularapp', ['ngRoute', 'firebase', 'ngSanitize']);

    var _fbUrl = 'https://blinding-fire-2931.firebaseio.com';
    app.value('fbRecipesUrl', _fbUrl + '/recipes');
    app.value('fbBeveragesUrl', _fbUrl + '/beverages');
    app.value('fbImagesUrl', _fbUrl + '/images');
    app.value("fbUrl", _fbUrl);

    app.factory('myHttpInterceptor', function ($q) {
        return httpInterceptor;
    });

    app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        addRoute($routeProvider, '/recipe/new',                 'RecipeCreateCtrl',   'recipe/edit.html');
        addRoute($routeProvider, '/recipe/edit/:recipeId',      'RecipeEditCtrl',     'recipe/edit.html');
        addRoute($routeProvider, '/recipe/view/:recipeId',      'RecipeViewCtrl',     'recipe/view.html');
        addRoute($routeProvider, '/recipe/list',                'RecipeListCtrl',     'recipe/list.html');
        addRoute($routeProvider, '/beverage/new',               'BeverageCreateCtrl', 'beverage/edit.html');
        addRoute($routeProvider, '/beverage/edit/:beverageId',  'BeverageEditCtrl',   'beverage/edit.html');
        addRoute($routeProvider, '/beverage/view/:beverageId',  'BeverageViewCtrl',   'beverage/view.html');
        addRoute($routeProvider, '/beverage/list',              'BeverageListCtrl',   'beverage/list.html');
        addRoute($routeProvider, '/login',                      'LoginCtrl',          'login.html');
        addRoute($routeProvider, '/massUpload',                 'MassUploadCtrl',     'massUpload/view.html');
        
        addRoute($routeProvider, '/:directives?',               null,                 'frontpage.html');

        $routeProvider.otherwise({redirectTo: '/'});

        $httpProvider.interceptors.push('myHttpInterceptor');
    }]);

    if (window.location.href.search("mockStorage") == -1) {
        app.service('StorageService', storageService);
    }
    else {
        setupMockStorage();
    }

    app.controller('ParentCtrl', parentController);
    app.controller('ListCtrl',   listController);

    app.controller('LoginCtrl', function ($scope, $controller) {
        $controller('ParentCtrl', {$scope: $scope});

        $("*[ng-model='user.email']").focus();
    });

    addRecipeControllers();
    addBeverageControllers();
    addMassUploadController();

    app.directive('customOnChange', callFunctionSpecifiedOnElement);
    app.directive('searchFocus',    searchFocus);
    //app.directive('categories',     categoriesValidator);
}

function addRoute(provider, url, controller, templateUrl) {
    provider.when(url, {controller: controller, templateUrl: templateUrl});
}

function storageService($firebase, fbRecipesUrl, fbBeveragesUrl, fbImagesUrl) {
    this.findAllRecipes = function (imageAddedFn) {
        var recipesRef = new Firebase(fbRecipesUrl);
        var recipes = $firebase(recipesRef).$asArray();
        recipes.$loaded().then(function() {
            recipes.forEach(function (recipe) {
                recipe.image = defaultImageData;
            });

            var imagesRef = new Firebase(fbImagesUrl);
            imagesRef.on("child_added", imageAddedFn);
        });        

        return recipes;
    };
    this.findRecipe = function (recipeId, imageFoundFn) {
        var service = this;
        console.log("finding recipe " + recipeId);
        var recipe = $firebase(new Firebase(fbRecipesUrl + '/' + recipeId)).$asObject();
        recipe.$loaded().then(function() {
            recipe.image = defaultImageData;
            service.findImage(recipe, imageFoundFn);
        });
        return recipe;
    };
    this.addRecipe = function (recipe, recipes) {
        recipes.$add(recipe);
    };
    this.updateRecipe = function (recipe) {
        var recipeImage = recipe.image;
        recipe.image = "";

        var recipeRef = $firebase(new Firebase(fbRecipesUrl + "/" + recipe.$id));
        recipeRef.$transaction(function (currentRecipe) {
            currentRecipe.name = recipe.name;
            currentRecipe.tags = recipe.tags || '';
            currentRecipe.image = recipe.image;
            currentRecipe.instructions = recipe.instructions;
            currentRecipe.ingredients = recipe.ingredients;
            currentRecipe.portions = recipe.portions;
            return currentRecipe;
        }).then(function (snapshot) {
            if (!snapshot) {
                console.log("Error");
            }
        }
        , function (err) {
            console.log(err);
        });

        this.findImage(recipe, function saveImage(snap, imagesRef) {
            var imageRef = snap.val();
            if (imageRef) {
                imageRef[Object.keys(imageRef)[0]].image = recipeImage;
                imagesRef.update(imageRef);
            } else {
                imageRef = imagesRef.push();
                var newImage = {
                    "recipeID" : recipe.$id,
                    "image"    : recipeImage
                };
                imageRef.setWithPriority(newImage, newImage.recipeID);
            }
        });
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
    }

    this.findImage = function(recipe, callbackFn) {
        var imagesRef = new Firebase(fbImagesUrl);
        imagesRef
            .orderByChild("recipeID")
            .startAt(recipe.$id)
            .endAt(recipe.$id)
            .limitToFirst(1)
            .once('value', function (snap) { callbackFn(snap, imagesRef); });
    }
};

parentController = ['$scope', '$location', 'fbUrl',
    function ($scope, $location, fbUrl) {
        var ref = new Firebase(fbUrl);
        ref.getAuth() || $location.path("login");

        ref.onAuth(function (authData) {
            if (authData) {
                $scope.userId = authData.password.email;
            } else {
                $scope.userId = null;
            }
        });
        $scope.logout = function () {
            ref.unauth();
        };
        $scope.login = function () {
            $("#spinner").show();
            ref.authWithPassword({
                email: $scope.user.email,
                password: $scope.user.password
            }, function (error /*, authData*/) {
                $("#spinner").hide();
                if (error === null) {
                    $location.path("recipe/list");
                    $scope.$apply();
                } else {
                    alert(error);
                }
            });
        };

        $scope.chooseImage = function () {
            $("#detailImage").trigger('click');
        };

        $scope.changeImage = function(entity) {
            var file = $("#detailImage")[0].files[0],
                reader = new FileReader();

            reader.onloadend = function (e) {
                var imageBase64 = e.target.result;
                entity.image = imageBase64;
                $scope.$apply();
            };

            reader.readAsDataURL(file);
        };

        $scope.setImageOnRecipe = function(snap, imagesRef) {
            var imageRef = snap.val();
            if (imageRef) {
                $scope.recipe.image = imageRef[Object.keys(imageRef)[0]].image;
            } else {
                $scope.recipe.image = defaultImageData;
            }
        };
    }
];

listController = ['$scope', '$controller', function ($scope, $controller) {
    $controller('ParentCtrl', {$scope: $scope});

    $scope.showSearchInMenu = true;

    $scope.showSearch = function() {
        $scope.searchShown = true;
    }
}];

var _outstanding_requests = 0;

function toggle_spinner(requests_diff) {
    _outstanding_requests += requests_diff;
    console.log("Requests " + (requests_diff > 0 ? "up" : "down") + " to " + _outstanding_requests);
    if (_outstanding_requests <= 0) {
        console.log("hiding");
        setTimeout(function () {
            _outstanding_requests <= 0 && $("#spinner").hide();
        }, 1500);
    }
    else {
        console.log("showing");
        setTimeout(function () {
            _outstanding_requests > 0 && $("#spinner").show();
        }, 1500);
    }
}
function updateSpinnerOnRequest() {
    toggle_spinner(1);
}
function updateSpinnerOnResponse() {
    toggle_spinner(-1);
}

httpInterceptor = {
    'request': function (config) {
        updateSpinnerOnRequest();
        return config;
    },
    'requestError': function (rejection) {
        updateSpinnerOnRequest();
        return $q.reject(rejection);
    },
    'response': function (response) {
        updateSpinnerOnResponse();
        return response;
    },
    'responseError': function (rejection) {
        updateSpinnerOnResponse();
        return $q.reject(rejection);
    }
};

callFunctionSpecifiedOnElement = function () {
    'use strict';
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var onChangeFunc = element.scope()[attrs.customOnChange];
            element.bind('change', onChangeFunc);
        }
    };
};

searchFocus = ['$timeout', function($timeout) {

    function link(scope, element) {
        scope.$watch('searchShown', function(value) {
            var focusIfTrue = function() { value && element[0].focus(); };
            $timeout(focusIfTrue, 0, false);
        });
    }
    return {
        link: link
    };
}];

categoriesValidator = function() {

    this.validCategoryValueSets = [["middag", "smårett"]];

    this.validator = function(modelValue, viewValue) {
        var _this = this;
        var allValid = true;
        this.validCategoryValueSets.forEach(function (categoryValues) {
            allValid = allValid && _this.containsAtLeastOne(viewValue, categoryValues);
        });
        return allValid;
    };

    this.containsAtLeastOne = function(viewValue, validValues) {
        validValues.forEach(function(validValue) {
            console.log("Checking " + validValue + " and " + viewValue);
            if (/ validValue /.test(" " + viewValue + " "))
                return true;
        });
        return false;
    }
};

catVal = new categoriesValidator();

findRecipeById = function(recipes, id) {
    var result = null;
    recipes.forEach( function(it) {
        if (it.$id == id) result = it;
    });
    return result;
}
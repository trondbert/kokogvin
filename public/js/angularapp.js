
app = {};

function configApp() {
    app = angular.module('angularapp', ['ngRoute', 'firebase', 'ngSanitize']);

    var _fbUrl = 'https://blinding-fire-2931.firebaseio.com';
    app.value('fbRecipesUrl', _fbUrl + '/recipes');
    app.value('fbBeveragesUrl', _fbUrl + '/beverages');
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

    app.controller('LoginCtrl', function ($scope, $controller) {
        $controller('ParentCtrl', {$scope: $scope});

        $("*[ng-model='user.email']").focus();
    });

    app.controller('HeaderCtrl', function ($scope, $controller) {
        $controller('ParentCtrl', {$scope: $scope});
    });

    addRecipeControllers();
    addBeverageControllers();

    app.directive('customOnChange', function () {
        'use strict';
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var onChangeFunc = element.scope()[attrs.customOnChange];
                element.bind('change', onChangeFunc);
            }
        };
    });
}

function addRoute(provider, url, controller, templateUrl) {
    provider.when(url, {controller: controller, templateUrl: templateUrl});
}

function storageService($firebase, fbRecipesUrl, fbBeveragesUrl) {
    this.findAllRecipes = function () {
        var recipesRef = new Firebase(fbRecipesUrl);
        return $firebase(recipesRef).$asArray();
    };
    this.findRecipe = function (recipeId) {
        console.log("finding recipe " + recipeId);
        return $firebase(new Firebase(fbRecipesUrl + '/' + recipeId)).$asObject();
    };
    this.addRecipe = function (recipe, recipes) {
        recipes.$add(recipe);
    };
    this.updateRecipe = function (recipe) {
        var recipeRef = $firebase(new Firebase(fbRecipesUrl + "/" + recipe.$id));
        recipeRef.$transaction(function (currentRecipe) {
            currentRecipe.name = recipe.name;
            currentRecipe.tags = recipe.tags || '';
            currentRecipe.image = recipe.image;
            currentRecipe.instructions = recipe.instructions;
            currentRecipe.ingredients = recipe.ingredients;
            return currentRecipe;
        }).then(function (snapshot) {
                if (!snapshot) {
                    console.log("Error");
                }
            }
            , function (err) {
                console.log(err);
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
};

parentController = ['$scope', '$location', 'fbUrl',
    function ($scope, $location, fbUrl) {
        var ref = new Firebase(fbUrl);
        ref.getAuth() || $location.path("login");

        ref.onAuth(function (authData) {
            if (authData) {
                console.log("User ID: " + authData.password.email);
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
                    console.log("Logged in: " + $scope.user.email);
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
                console.log(imageBase64);
                entity.image = imageBase64;
                $scope.$apply();
            };

            reader.readAsDataURL(file);
        };
    }
];

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


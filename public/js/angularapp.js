var app = {};

// CONSTANTS
var TEST_PORT = "1337";
var INGREDIENTS_COLUMN_BREAK = "~*/|";

var defaultImageDataOld = "data:image/jpeg;base64,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AAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAGf/aAAwDAQACEQMRAD8A/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9D95KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0f3kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9P95KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooprbipCnDY4PvQBzWu+MfD3h1xBqNzm4YZEMSmSUj1Kr0HucVzC/FXRWfBsLxU/vFI/5eZn9K88sfA3iWS8eC4t2+0SMWmuJD8rserlu+ewH0xXWT/DK8jtmkgvElmUZCbSAx9Ac/0oA9L0fxDpOvRGTTZxIU+8jAq6/VTg/j0rar5a0XUpdO1C11K2bDIw/FTwQfYivqUEEZHQ0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//U/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAIbq4jtLWa7lzsgRpGwMnCjJx+ArwnUfiZr2qWrRaZaR6dHMpxIzGWZVPcAAKrY784r3mWNJonhkGVkBUj2Iwa8s0D4btpt8H1SSO7tYQQi4Pz9gWHQY/nQB594V8O3Oq3lvbW6N9mhK+ZIegVff1NfS/A4HSooYIbeMQ26LEi9FUAAfgKloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//V/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOc8XT6lbeGdRn0kkXSxHYVGWXPBYe4GSK8N8HSX1tr9n9gmlkeWQCTLs/mKfvF8k545z2r6VqrBY2VtI0ttbxxO/3mRApP1IoAtUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//W/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAqX1/Y6Zbm71G4jtYV4LyMEXJ7ZOKw/+E28If9Bm0/7+rXjnxA1Aat4rktj80GkqsSA9POcbnbHqAQufauUwPSgD6O/4Tbwh/wBBm0/7+rR/wm3hD/oM2n/f1a+cvl9KPl9KAPo3/hNvCH/QZtP+/q0q+NPCLEKNZtMnj/XLXzj8vpRhT2oA+sldJEWSNgysMgg5BHqDTq8z+Gmo+dp8+lOebVg6D0R+w+hH616ZQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9f95KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKUAnoK878deMpvDyw6bpaq+pXQLguMpFGDguw7knhR379K8WuL/AFe9cy3+pXU7nr+9ZFH0VCFA+goA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252/E9vbpUmDRg0AJRS4NGDQAlFLg1qaZomqavMIbGBmz1cjCKPUnpQB6p8MVI0u9bsZxj/vkV6XWPoOjxaHpkWnxHcVyzt/ec9T/h7VsUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//1P3kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoPPUZoooATC+g/KjC+g/KlooATC+g/KjC+g/KlooATC+g/KjC+g/KlooATC+g/KjC+g/KlooATC+g/KjC+g/KlooATC+g/Kl6DA4oooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9X95KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1v3kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/eSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9D95KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0f3kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z";
var placeholderImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QCwRXhpZgAATU0AKgAAAAgABQEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAExAAIAAAAMAAAAWodpAAQAAAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABR0lNUCAyLjguMTAAAAWQAAAHAAAABDAyMTCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAAcKgAwAEAAAAAQAAASwAAAAA/+EDDGh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiB4bWxuczpleGlmPSdodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyc+CiAgPGV4aWY6WFJlc29sdXRpb24+NzI8L2V4aWY6WFJlc29sdXRpb24+CiAgPGV4aWY6WVJlc29sdXRpb24+NzI8L2V4aWY6WVJlc29sdXRpb24+CiAgPGV4aWY6UmVzb2x1dGlvblVuaXQ+SW5jaDwvZXhpZjpSZXNvbHV0aW9uVW5pdD4KICA8ZXhpZjpTb2Z0d2FyZT5BZG9iZSBQaG90b3Nob3AgQ0MgTWFjaW50b3NoPC9leGlmOlNvZnR3YXJlPgogIDxleGlmOkV4aWZWZXJzaW9uPkV4aWYgVmVyc2lvbiAyLjE8L2V4aWY6RXhpZlZlcnNpb24+CiAgPGV4aWY6Rmxhc2hQaXhWZXJzaW9uPkZsYXNoUGl4IFZlcnNpb24gMS4wPC9leGlmOkZsYXNoUGl4VmVyc2lvbj4KICA8ZXhpZjpDb2xvclNwYWNlPnNSR0I8L2V4aWY6Q29sb3JTcGFjZT4KICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NDAwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MzAwPC9leGlmOlBp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";

function configApp() {
    app = angular.module('angularapp', ['ngRoute', 'firebase', 'ngSanitize']);

    var _fbUrl = 'https://blinding-fire-2931.firebaseio.com';
    app.value('fbRecipesUrl', _fbUrl + '/recipes');
    app.value('fbBeveragesUrl', _fbUrl + '/beverages');
    app.value('fbImagesUrl', _fbUrl + '/images');
    app.value('fbUrls', {
        root: _fbUrl,
        recipes: _fbUrl + '/recipes',
        images: _fbUrl + '/images',
        beverages: _fbUrl + '/beverages'
    });

    app.factory('myHttpInterceptor', function () {
        return httpInterceptor;
    });

    app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        addRoute($routeProvider, '/recipe/new', 'RecipeCreateCtrl', 'recipe/edit.html');
        addRoute($routeProvider, '/recipe/edit/:recipeId', 'RecipeEditCtrl', 'recipe/edit.html');
        addRoute($routeProvider, '/recipe/view/:recipeId', 'RecipeViewCtrl', 'recipe/view.html');
        addRoute($routeProvider, '/recipe/list', 'RecipeListCtrl', 'recipe/list.html');
        addRoute($routeProvider, '/beverage/new', 'BeverageCreateCtrl', 'beverage/edit.html');
        addRoute($routeProvider, '/beverage/edit/:beverageId', 'BeverageEditCtrl', 'beverage/edit.html');
        addRoute($routeProvider, '/beverage/view/:beverageId', 'BeverageViewCtrl', 'beverage/view.html');
        addRoute($routeProvider, '/beverage/list', 'BeverageListCtrl', 'beverage/list.html');
        addRoute($routeProvider, '/login', 'LoginCtrl', 'login.html');
        addRoute($routeProvider, '/massUpload', 'MassUploadCtrl', 'massUpload/view.html');

        addRoute($routeProvider, '/:directives?', null, 'frontpage.html');

        $routeProvider.otherwise({redirectTo: '/'});

        $httpProvider.interceptors.push('myHttpInterceptor');
    }]);

    if (window.location.host.split(":")[1] == TEST_PORT) {
        app.service("StorageService", storageServiceMock);
    }
    else {
        app.service('StorageService', storageService);
    }

    app.service('RecipeFinder', recipeFinder);

    app.controller('ParentCtrl', parentController);
    app.controller('ListCtrl', listController);

    app.controller('LoginCtrl', ['$scope', '$controller', function ($scope, $controller) {
        $controller('ParentCtrl', {$scope: $scope});

        $("*[ng-model='user.email']").focus();
    }]);

    addRecipeControllers();
    addBeverageControllers();
    addMassUploadController();

    app.directive('customOnChange', callFunctionSpecifiedOnElement);
    app.directive('searchFocus', searchFocus);
    app.directive('categories', categoriesValidator);
}

function addRoute(provider, url, controller, templateUrl) {
    provider.when(url, {controller: controller, templateUrl: templateUrl});
}

parentController = ['$scope', '$location', 'fbUrls', 'StorageService',
    function ($scope, $location, fbUrls, StorageService) {

        $scope.logout = function () {
            StorageService.logOut();
            $location.path("login");
        };
        $scope.login = function () {
            $("#spinner").show();

            StorageService.authWithPassword({
                    email:      $scope.user.email,
                    password:   $scope.user.password
                },
                function (error) {
                    debugMsg("callback in login");
                    $("#spinner").hide();
                    if (error === null) {
                        $location.path("recipe/list");
                        $scope.$apply();
                    } else {
                        alert(error);
                    }
                }
            );
        };

        $scope.chooseImage = function () {
            $("#detailImage").trigger('click');
        };

        $scope.changeImage = function (entity) {
            var file = $("#detailImage")[0].files[0];
            var reader = new FileReader();

            reader.onloadend = function (e) {
                entity.image = e.target.result;
                $scope.$apply();
            };

            reader.readAsDataURL(file);
        };

        $scope.setImageOnRecipe = function (snap) {
            var imageRef = snap.val();
            if (imageRef) {
                $scope.recipe.image = imageRef[Object.keys(imageRef)[0]].image;
            }
        };

        $scope.placeholderImage = placeholderImage;
        window.scope = $scope;

        StorageService.loggedIn() || $location.path("login");
        StorageService.onAuth(function (authData) {
            debugMsg("onAuth");
            if (authData) {
                $scope.userId = authData.password.email;
            } else {
                $scope.userId = null;
            }
        });
    }];

listController = ['$scope', '$controller', function ($scope, $controller) {
    $controller('ParentCtrl', {$scope: $scope});

    $scope.showSearchInMenu = true;

    $scope.showSearch = function () {
        $scope.searchShown = true;
    }
}];

var _outstanding_requests = 0;

function toggle_spinner(requests_diff) {
    _outstanding_requests += requests_diff;
    if (_outstanding_requests <= 0) {
        setTimeout(function () {
            _outstanding_requests <= 0 && $("#spinner").hide();
        }, 1500);
    }
    else {
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

searchFocus = ['$timeout', function ($timeout) {

    function link(scope, element) {
        scope.$watch('searchShown', function (value) {
            var focusIfTrue = function () {
                value && element[0].focus();
            };
            $timeout(focusIfTrue, 0, false);
        });
    }

    return {
        link: link
    };
}];

var categoriesValidator = function () {
    var validCategoryValueSets = [["middag", "smårett"]];

    var validate = function (viewValue) {
        var allValid = true;
        validCategoryValueSets.forEach(function (categoryValues) {
            allValid = allValid && containsAtLeastOne(viewValue, categoryValues);
        });
        return allValid;
    };

    var containsAtLeastOne = function (viewValue, validValues) {
        var match = false;
        validValues.forEach(function (validValue) {
            if (new RegExp(validValue).test(" " + viewValue + " "))
                match = true;
        });
        return match;
    };

    return {
        // restrict to an attribute type.
        restrict: 'A',

        // element must have ng-model attribute.
        require: 'ngModel',

        // scope = the parent scope
        // elem = the element the directive is on
        // attr = a dictionary of attributes on the element
        // ctrl = the controller for ngModel.
        link: function (scope, elem, attr, ctrl) {

            // add a parser that will process each time the value is
            // parsed into the model when the user updates it.
            ctrl.$parsers.unshift(function (value) {
                var valid = validate(value);
                ctrl.$setValidity('categories', valid);

                return valid ? value : undefined;
            });

            // add a formatter that will process each time the value
            // is updated on the DOM element.
            ctrl.$formatters.unshift(function (value) {
                ctrl.$setValidity('categories', validate(value));
                // return the value or nothing will be written to the DOM.
                return value;
            });
        }
    };
};

findRecipeById = function (recipes, id) {
    var result = null;
    recipes.forEach(function (it) {
        if (it.$id == id) result = it;
    });
    return result;
};

var DEBUG = { ordinal: 1, text: "DEBUG" };
var WARN =  { ordinal: 2, text: "WARN"  };
var LOG_LEVEL = DEBUG;

(function logLevels() {
}(DEBUG, WARN));

debugMsg = function (message) {
    logMsg(message, DEBUG);
};

logMsg = function (message, logLevel) {
    if (LOG_LEVEL.ordinal <= logLevel.ordinal) {
        console.log(logLevel.text + ": " + message);
    }
};


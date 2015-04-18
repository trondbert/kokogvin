
function addBeverageControllers() {
    app.controller('BeverageCtrl', ['$scope',
        function($scope) {

            $scope.addBeverage = function (beverage) {
                $scope.beverages.push(beverage);
                $scope.$applyAsync();
            };

            $scope.beverageFoundCB = function(beverage) {
                $scope.beverage = beverage;
                if (!beverage) { $scope.showNotice("Fant ikke vinen"); return; }
                $scope.$applyAsync();
            };
            $scope.imageFoundCB = function(beverage, image) {
                if (image && image.imageData && !$scope.image.imageData) {
                    $scope.image = image;
                } else if (!$scope.image.imageData) {
                    $scope.image = {};
                }
                $scope.$applyAsync();
            };

            $scope.changeBeverageImage = function() {
                $scope.changeImage($scope.image, function(result) {
                    if (result) $scope.showNotice(result);
                    else        $scope.imageForm.$setDirty();
                });
            };

            $scope.withBreaks = function(input) {
                return input && input.replace(/\n/g, '<br/>');
            };
        }
    ]);

    app.controller('BeverageListCtrl', ['$scope', '$controller', '$routeParams', 'BeverageDAO',
        function ($scope, $controller, $routeParams, BeverageDAO) {
            $controller('ListCtrl',   {$scope: $scope});
            $controller('BeverageCtrl', {$scope: $scope});

            $scope.search = function (item) {
                if (!$scope.query) {
                    return true;
                }
                var haystack = [item.name, item.tags, item.ingredients].join(";").toLowerCase();
                var needle = $scope.query.toLowerCase();

                return haystack.indexOf(needle) != -1;
            };

            $scope.imageAdded = function(beverage, image) {
                beverage.imageData = image ? image.imageData : null;
                $scope.$applyAsync();
            };

            $scope.beverages = [];

            if ($scope.userId) {
                if ($routeParams.tags) {
                    var tagList = $routeParams.tags.split("&");
                    BeverageDAO.findByTags(tagList, $scope.addBeverage, $scope.imageAdded);
                } else {
                    BeverageDAO.findAll($scope.addBeverage, $scope.imageAdded);
                }
                $scope.$applyAsync();
            }
        }
    ]);

    app.controller('BeverageCreateCtrl',
        ['$scope', '$controller', '$location', 'BeverageDAO',
            function ($scope,   $controller,   $location,   BeverageDAO) {
                $controller('ParentCtrl', {$scope: $scope});
                $controller('BeverageCtrl', {$scope: $scope});

                $scope.save = function () {
                    $scope.editBeverageForm.submitted = true;

                    BeverageDAO.updateOrInsert($scope.beverage, $scope.image, function (result) {
                        if (result) { $scope.showNotice(result) }
                        else {
                            $scope.$apply(function() {
                                $location.path("/beverage/view/" + $scope.beverage.$id);
                            });
                        }
                    });
                };

                $scope.beverage = {}; $scope.image = {};
            }
        ]);

    app.controller('BeverageEditCtrl',
        ['$scope', '$controller', '$location', '$routeParams', 'BeverageDAO',
            function ($scope,   $controller,   $location,   $routeParams,   BeverageDAO)
            {
                $controller('ParentCtrl', {$scope: $scope});
                $controller('BeverageCtrl', {$scope: $scope});

                $scope.remove = function ()
                {
                    var error = "Sletting av '" + $scope.beverage.name + "' feila.";
                    var callback = function (result) {
                        if (result) { $scope.showNotice(error); }
                        else {
                            $scope.$apply(function() {
                                $location.path("/beverage/list"); });
                        }
                    };
                    BeverageDAO.remove($scope.beverage, callback);
                };

                $scope.save = function ()
                {
                    $scope.editBeverageForm.submitted = true;
                    if (!$scope.editBeverageForm.$valid) {
                        window.scrollTo(0, 0);
                        return;
                    }
                    if (!$scope.image.imageData) {
                        $scope.beverage.imageId = null;
                    }
                    var imageDirty = $scope.imageForm.$dirty;
                    var imageToUpdate = imageDirty ? $scope.image : null;
                    if (imageDirty) {
                        $scope.beverage.imageTimestamp = Date.now();
                    }
                    BeverageDAO.updateOrInsert($scope.beverage, imageToUpdate, function (result) {
                        if (result) {
                            $scope.showNotice(error);
                        } else {
                            $scope.$apply(function () {
                                $location.path('beverage/view/' + $scope.beverage.$id);
                            });
                        }
                    });
                };

                $scope.beverage = {}; $scope.image = {};
                BeverageDAO.findById($routeParams.beverageId, $scope.beverageFoundCB, $scope.imageFoundCB);
            }
        ]);

    app.controller('BeverageViewCtrl',
                ['$scope', '$controller', '$location', '$routeParams', 'BeverageDAO',
        function ($scope,   $controller,   $location,   $routeParams,   BeverageDAO)
        {
            $controller('ParentCtrl', {$scope: $scope});
            $controller('BeverageCtrl', {$scope: $scope});

            $scope.beverage = {}; $scope.image = {};
            BeverageDAO.findById($routeParams.beverageId, $scope.beverageFoundCB, $scope.imageFoundCB);

            $scope.edit = function() {
                $location.path("beverage/edit/" + $scope.beverage.$id);
            }
        }
    ]);
}



function addBeverageControllers() {

    app.controller('BeverageListCtrl', ['$scope', '$controller', 'StorageService',
                               function ($scope, $controller, StorageService)
        {
            $controller('ListCtrl', {$scope: $scope});

            if ($scope.userId) {
                $scope.beverages = StorageService.findAllBeverages();
            }

            $scope.search = function (item) {
                if (!$scope.query) {
                    return true;
                }
                var haystack = [item.name, item.tags, item.comments].join(";").toLowerCase();
                var needle = $scope.query.toLowerCase();

                return haystack.indexOf(needle) != -1;
            };

        }
    ]);

    app.controller('BeverageCreateCtrl', ['$scope', '$controller', '$location', 'StorageService',
                                 function ($scope, $controller, $location, StorageService)
        {
            $controller('ParentCtrl', {$scope: $scope});

            $scope.beverage = {};
            $scope.beverages = StorageService.findAllBeverages();
            console.log($scope.beverages);

            $scope.save = function () {
                $scope.editBeverageForm.submitted = true;

                StorageService.addBeverage($scope.beverage, $scope.beverages);

                $scope.beverage = {};
                $location.path('/');
            };

            $scope.changeBeverageImage = function() { $scope.changeImage($scope.beverage); };
        }
    ]);

    app.controller('BeverageEditCtrl', ['$scope', '$controller', '$location', '$routeParams', 'StorageService',
                               function ($scope, $controller, $location, $routeParams, StorageService)
        {
            $controller('ParentCtrl', {$scope: $scope});

            $scope.beverage = StorageService.findBeverage($routeParams.beverageId);

            $scope.save = function () {
                $scope.editBeverageForm.submitted = true;
                var beverageValid = $scope.editBeverageForm.$valid;
                if (beverageValid) {
                    StorageService.updateBeverage($scope.beverage);
                    $location.path('/beverage/view/' + $routeParams.beverageId);
                } else {
                    window.scrollTo(0, 0);
                }
            };

            $scope.changeBeverageImage = function() { $scope.changeImage($scope.beverage); };
        }
    ]);

    app.controller('BeverageViewCtrl', ['$scope', '$controller', '$location', '$routeParams', 'StorageService',
                               function ($scope, $controller, $location, $routeParams, StorageService)
        {
            $controller('ParentCtrl', {$scope: $scope});
            $scope.beverage = StorageService.findBeverage($routeParams.beverageId);
            $scope.commentsWithBreaks = function () {
                return $scope.beverage.comments && $scope.beverage.comments.replace(/\n/g, '<br/>');
            };
        }
    ]);

}


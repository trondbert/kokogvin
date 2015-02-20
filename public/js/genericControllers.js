
var genericControllers = {

    parent : ['$scope', '$location', '$route', 'fbUrls', 'StorageService',
        function ($scope, $location, $route, fbUrls, StorageService) {

            $scope.logout = function () {
                StorageService.logOut();
                $location.path("/");
            };
            $scope.login = function () {
                $("#spinner").show();

                StorageService.authWithPassword({
                        email:      "trondvalen@gmail.com",
                        password:   $scope.user.password
                    },
                    function (error) {
                        debugMsg("callback in login");
                        $("#spinner").hide();
                        if (error) {
                            alert(error);
                        } else {
                            $route.reload();
                        }
                    }
                );
            };

            $scope.chooseImage = function () {
                $("#detailImage").trigger('click');
            };

            $scope.changeImage = function (entity) {
                var file = $("#detailImage")[0].files[0];
                if (file.size > 50000) {
                    $scope.showNotice("Fila er for stor");
                    return;
                }
                var reader = new FileReader();

                reader.onloadend = function (e) {
                    entity.imageData = e.target.result;
                    $scope.$apply();
                };

                reader.readAsDataURL(file);
            };

            $scope.setImageOnRecipe = function (image) {
                if (image) {
                    $scope.recipe.imageData = image.imageData;
                }
            };

            $scope.entityAdded = function() {
                $scope.$applyAsync();
            };

            $scope.showNotice = function(text) {
                $(".noticeBox").text(text).show()
                    .fadeOut(4000);
            };

            $scope.placeholderImage = placeholderImage;
            $scope.waitingImage = waitingImage;
            $scope.user = $scope.user || {};
            window.scope = $scope;

            StorageService.onAuth(function (authData) {
                debugMsg("onAuth");
                if (authData) {
                    $scope.userId = authData.password.email;
                } else {
                    $scope.userId = null;
                }
            });
        }],

    list: ['$scope', '$controller', function ($scope, $controller) {
        $controller('ParentCtrl', {$scope: $scope} );

        $scope.showSearchInMenu = true;

        $scope.showSearch = function () {
            $scope.searchShown = true;
        }
    }]
};

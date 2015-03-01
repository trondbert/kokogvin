
var genericControllers = {

    parent : ['$scope', '$location', '$route', 'fbUrls', 'StorageService',
        function ($scope, $location, $route, fbUrls, StorageService) {
            traceMsg("Parent Controller...");

            $scope.logout = function () {
                StorageService.logOut();
                $location.path("/");
            };
            $scope.login = function () {
                $("#spinner").show();

                traceMsg("Authenticating");
                StorageService.authWithPassword({
                        email:      "trondvalen@gmail.com",
                        password:   $scope.user.password
                    },
                    function (error) {
                        $("#spinner").hide();
                        if (error) {
                            alert(error);
                        } else {
                            traceMsg("Route reload")
                            $route.reload();
                        }
                    }
                );
            };

            $scope.chooseImage = function () {
                $("#detailImage").trigger('click');
            };

            $scope.changeImage = function (entity, callback) {
                var file = $("#detailImage")[0].files[0];
                if (file.size > 61440) {
                    callback("Bildet kan ikke være større enn 60 KB");
                    return;
                }
                var reader = new FileReader();

                reader.onloadend = function (e) {
                    $scope.$apply(function() {entity.imageData = e.target.result;});
                    callback();
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
                traceMsg("onAuth");
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

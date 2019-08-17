app.controller('loginController', ['$scope', '$rootScope', 'api', 'localStorageService',
    function ($scope, $rootScope, api, localStorageService) {
        $scope.obj = {};

        $scope.login = function (obj) {
            api.frontOffice.post('login/', obj)
                .success(function (data) {
                    $scope.errorData = null;
                    localStorageService.set('front_office_token', data.token);
                    $rootScope.profile = data.profile;
                    $rootScope.isAuthenticated = true;
                })
                .error(function (data) {
                    $scope.errorData = data;
                });
        }
    }
]);
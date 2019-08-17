app.controller('logoutController', ['$scope', '$rootScope', '$uibModalInstance', 'api', 'localStorageService',
    function ($scope, $rootScope, $uibModalInstance, api, localStorageService) {
        $scope.ok = function () {
            api.frontOffice.post('logout/')
                .success(function (data) {
                    $uibModalInstance.close();
                    localStorageService.remove('front_office_token');
                    $rootScope.profile = null;
                    $rootScope.isAuthenticated = false;
                });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }]);
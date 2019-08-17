app.controller('signUpController', ['$scope', '$rootScope', 'api', 'localStorageService','$uibModalInstance',
    function ($scope, $rootScope, api, localStorageService , $uibModalInstance) {
        $scope.obj = {};

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        }

        $scope.ok = function () {
            api.frontOffice.post('sign_up/', $scope.obj)
                .success(function (data) {
                    $scope.errorData = null;
                    localStorageService.set('front_office_token', data.token);
                    $rootScope.profile = data.profile;
                    $rootScope.isAuthenticated = true;
                    $uibModalInstance.close();
                })
                .error(function (data) {
                    $scope.errorData = data;
                });
        }
    }
]);
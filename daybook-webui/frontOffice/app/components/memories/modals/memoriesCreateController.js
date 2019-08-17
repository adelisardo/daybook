app.controller('memoriesCreateController', ['$scope', 'api', 'messageBox', '$uibModalInstance',
    function ($scope, api, messageBox, $uibModalInstance) {
        $scope.obj = {};

        $scope.create = function (obj) {
            api.frontOffice.post('memories', obj)
                .success(function (data) {
                    $scope.errorData = null;
                    messageBox.createdSuccess();
                    $uibModalInstance.close(data.id);
                })
                .error(function (data) {
                    $scope.errorData = data;
                });
        };
        $scope.close = function () {
            $uibModalInstance.dismiss();
        }
    }
]);
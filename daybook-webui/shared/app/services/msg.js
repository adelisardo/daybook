app.factory('msg', ['$scope', '$uibModal',
    function ($scope , $uibModal) {
        return function (title, message) {
            var modalHtml = '';
            modalHtml += '<div class="modal-header"><h4 class="modal-title">' + title + '</h4></div>';
            modalHtml += '<div class="modal-body">' + message + '</div>';
            modalHtml += '<div class="modal-footer"><button class="btn btn-success" ng-click="ok()">' + $scope.c.submit + '</button></div>';
            var modalInstance = $uibModal.open({
                controller: 'msgController',
                template: modalHtml,
                size: 'sm'
            });

        }
    }

]);
app.controller('msgController', ['$scope', '$uibModalInstance',
    function ($scope, $uibModalInstance) {
        $scope.ok = function () {
            $uibModalInstance.close();
        };
    }
]);
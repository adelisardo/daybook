angular.module('ngConfirmModule', ['ui.bootstrap'])
  .directive('ngConfirmClick', ['$uibModal',
    function ($uibModal) {
        var ModalInstanceCtrl = ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
            $scope.ok = function () {
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }]

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    var title = attrs.ngConfirmTitle || scope.c.delete;
                    var message = attrs.ngConfirmMessage || scope.c.deleteConfirm;
                    var size = attrs.ngConfirmSize || 'sm';

                    var modalHtml = '';
                    modalHtml += '<div class="modal-header"><h4 class="modal-title">' + title + '</h4></div>';
                    modalHtml += '<div class="modal-body">' + message + '</div>';
                    modalHtml += '<div class="modal-footer"><button class="btn btn-success" ng-click="ok()">' + scope.c.submit + '</button><button class="btn btn-link" ng-click="cancel()">' + scope.c.cancel + '</button></div>';

                    var modalInstance = $uibModal.open({
                        template: modalHtml,
                        controller: ModalInstanceCtrl,
                        size: size
                    });
                    modalInstance.result.then(function () {
                        scope.$eval(attrs.ngConfirmClick);
                    }, function () { });
                });
            }
        }
    }
  ]);
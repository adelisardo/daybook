app.controller('memoriesEditController', ['$scope', '$rootScope', 'api', '$window', '$routeParams', '$filter', '$q', '$timeout',
    function ($scope, $rootScope, api, $window, $routeParams, $filter, $q, $timeout) {
        var id = $routeParams.id;

        $rootScope.pageTitle = $filter('format')($rootScope.c.editA, $rootScope.c.memory);
        $scope.loading = true;
        $scope.fail_load = false;



        $scope.saving_data = false;
        $scope.unsaved_data = false;
        var save_timer = null;
        $scope.$watch('obj', function (n, o) {
            if (o && n !== o) {
                $scope.unsaved_data = true;
                if ($scope.setting.automatic_saving) {
                    if (save_timer) {
                        $timeout.cancel(save_timer);
                    }
                    save_timer = $timeout(function () {
                        $scope.save_changes();
                    }, 3000);
                }
            }
        }, true);

        $scope.onExit = function () {
            if ($scope.unsaved_data)
                return "You have unsaved changes, do you want to continue?";
            else
                return;
        };
        $window.onbeforeunload = $scope.onExit;

        $scope.$on('$routeChangeStart', function ($event, next, current) {
            if ($scope.unsaved_data &&
                !confirm("You have unsaved changes, do you want to continue?")
            )
                $event.preventDefault();
        });

        $scope.back = function () {
            $rootScope.navigate("/", {});
        }
        $scope.load = function () {
            api.frontOffice.get('memories/' + id)
                .success(function (d) {
                    $scope.obj = d.data;
                    $scope.loading = false;
                })
                .error(function (data) {
                    $scope.fail_load = true;
                    $scope.loading = false;
                });
        }
        $scope.save_changes = function () {
            if ($scope.canceler_save_changes) {
                $scope.canceler_save_changes.resolve();
            }
            var obj = $scope.obj;
            $scope.saving_data = true;
            $scope.canceler_save_changes = $q.defer();
            api.frontOffice.put('memories/' + id, obj, {
                    timeout: $scope.canceler_save_changes.promise
                })
                .success(function (data) {
                    $scope.errorData = null;
                    $scope.unsaved_data = false;
                    $scope.saving_data = false;
                })
                .error(function (data) {
                    $scope.errorData = data;
                    $scope.saving_data = false;
                });
        };


        $scope.load();
    }
]);
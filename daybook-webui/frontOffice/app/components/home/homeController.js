app.controller('homeController', ['$scope', '$rootScope', 'api', '$uibModal',
    function ($scope, $rootScope, api, $uibModal) {
        $scope.load_memories = function () {
            $scope.loading_memories = true;
            $scope.fail_load_memories = false;

            api.frontOffice.get('memories')
                .success(function (d) {
                    $scope.data = convertToByDayWise(d.data, 'memory_date_time');
                    $scope.loading_memories = false;
                })
                .error(function (data) {
                    $scope.fail_load_memories = true;
                    $scope.loading_memories = false;
                });
        }
        $scope.new_memory = function () {
            var modal = $uibModal.open({
                templateUrl: '/memoriesCreate.html',
                controller: 'memoriesCreateController',
                size: 'sm'
            });
            modal.result.then(function (id) {
                $scope.view_memory(id);
            });
        }

        $scope.view_memory = function (id) {
            $rootScope.navigate('memories/' + id, {});
        }

        function convertToByDayWise(arr, key) {
            if (arr.length == 0) {
                return null;
            } else {
                var groups = {};
                for (var i = 0; i < arr.length; i++) {
                    var dayWise = moment(arr[i][key]).format("MMMM Do YYYY (ddd)");
                    groups[dayWise] = groups[dayWise] || [];
                    groups[dayWise].push(arr[i]);
                }
                return groups;
            }
        };

        $scope.load_memories();

    }
]);
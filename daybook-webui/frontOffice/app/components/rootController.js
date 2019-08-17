app.controller('rootController', ['$scope', '$rootScope', '$route', '$location', '$uibModal', 'api',
    function ($scope, $rootScope, $route, $location, $uibModal, api) {
        //------------------------------
        //Search fields
        //------------------------------
        $rootScope.isLoadCommonInformation = false;
        $rootScope.isAuthenticated = false;

        $scope.setting = {
            automatic_saving: true
        };

        var dlgRetryLoadCommonInformation = null;
        $scope.loadCommonInformation = function () {
            if (dlgRetryLoadCommonInformation != null) {
                dlgRetryLoadCommonInformation.close();
            }
            api.frontOffice.get('commonInformation/')
                .success(function (data) {
                    $rootScope.isLoadCommonInformation = true;
                    $rootScope.c = data.culture;
                    $rootScope.profile = data.profile;
                    $rootScope.isAuthenticated = data.isAuthenticated;
                    $rootScope.app = data.app;
                    init();
                })
                .error(function (data) {
                    $rootScope.isLoadCommonInformation = false;
                    dlgRetryLoadCommonInformation = $uibModal.open({
                        templateUrl: 'retryLoadCommonInformation',
                        backdrop: 'static',
                        keyboard: false,
                        scope: $scope
                    });
                });
        }
        $scope.loadCommonInformation();

        function init() {
            var c = $rootScope.c;
            //------------------------------
            //Enums
            //------------------------------
            $rootScope.feelings = [{
                    id: 1,
                    name: 'Happiness'
                },
                {
                    id: 2,
                    name: 'Sadness'
                },
                {
                    id: 3,
                    name: 'Fear'
                },
                {
                    id: 4,
                    name: 'Disgust'
                },
                {
                    id: 5,
                    name: 'Anger'
                },
                {
                    id: 6,
                    name: 'Surprise'
                }
            ];
        }
        $scope.reloadCurrentRoute = function () {
            $route.reload();
        }

        $scope.sign_up = function () {
            $uibModal.open({
                templateUrl: 'signUp',
                controller: 'signUpController',
                size: 'sm'
            });
        }

        $scope.logout = function () {
            $uibModal.open({
                templateUrl: 'logout',
                controller: 'logoutController',
                size: 'sm'
            });
        }

        $scope.$on('$routeChangeSuccess', function (e, current, previous) {
            $rootScope.pageTitle = null;
            $rootScope.activeViewPath = $location.path();
            $scope.activeViewPath = $location.path();
            $scope.activeTemplateURL = current.templateUrl;
        });
        $rootScope.navigate = function (url, params) {
            if (params) {
                $location.path(url).search(params);
            } else {
                $location.path(url).search({});
            }
        };
        $scope.getIsActive = function () {
            if ($route.current) {
                var menuKey = $route.current.menuKey;
                for (var i = 0; i < arguments.length; i++) {
                    if (menuKey == arguments[i]) {
                        return 'active';
                    }
                }
            } else {
                return '';
            }
        }

        $rootScope.getDateTime = function (datetime) {
            if (datetime != null) {
                return moment(datetime).format("DD MMM YYYY, HH:mm");
            } else {
                return '';
            }
        }
        $rootScope.getAppVersion = function () {
            if ($rootScope.app == null) {
                return "";
            } else {
                return $rootScope.app.version.major + "." + $rootScope.app.version.minor;
            }
        }
        $rootScope.mergeOptions = function (obj1, obj2) {
            var obj3 = {};
            for (var attrname in obj1) {
                obj3[attrname] = obj1[attrname];
            }
            for (var attrname in obj2) {
                obj3[attrname] = obj2[attrname];
            }
            return obj3;
        }
        $rootScope.assign = function (target, source) {
            for (var attrname in source) {
                target[attrname] = source[attrname];
            }
        }
    }
]);
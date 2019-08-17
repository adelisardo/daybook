app.factory('check', ['$q', '$rootScope', '$location',
    function ($q, $rootScope, $location) {
        function checkAccessAndRedirect(permission, defer) {
            if ($rootScope.hasPermission(permission)) {
                return defer.resolve();
            }
            else {
                $rootScope.navigate('/');
                return defer.reject();
            }
        }

        return {
            access: function (permission) {
                var defer = $q.defer();
                if ($rootScope.isLoadCommonInformation == true) {
                    return checkAccessAndRedirect(permission, defer);
                }
                else {
                    var listener = $rootScope.$watch('[isLoadCommonInformation]', function (n, o) {
                        if (n !== o) {
                            if ($rootScope.isLoadCommonInformation == true) {
                                listener();
                                return checkAccessAndRedirect(permission, defer);
                            }
                        }
                    }, true);
                    return defer.promise;
                }
            }
        };
    }]);
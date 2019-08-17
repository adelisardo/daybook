app.factory('httpInterceptor', ['$q', '$rootScope', 'localStorageService', 'messageBox',
    function ($q, $rootScope, localStorageService, messageBox) {

        return {
            request: function (config) {
                config.headers = config.headers || {};

                var authData = localStorageService.get('front_office_token');

                if (authData) {
                    config.headers.Authorization = authData;
                }
                return config;
            },

            requestError: function (config) {
                return config;
            },

            response: function (response) {
                return response || $q.when(response);
            },

            responseError: function (rejection) {
                var data = rejection.data;
                var status = rejection.status;

                if(status < 100) return;
                
                //---------------------------------------------------------------------------------------
                //Firefox does not fire the offline and online events in the way that other browsers do.
                //---------------------------------------------------------------------------------------
                if (status < 400 || status > 500) { Offline.check(); }
                //---------------------------------------------------------------------------------------
                if (status === 400) {
                    if (data.errorCode === 102) {
                        $rootScope.isAuthenticated = false;
                    }
                    else {
                        messageBox.error(data.message);
                    }
                }
                else {
                    messageBox.error($rootScope.c.unHandledError);
                }

                return $q.reject(rejection);
            }
        }
    }]);

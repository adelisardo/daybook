app.factory('api', ['$http',
    function ($http) {
        var apiSharedPerfix = "#WEB_API_WITH_VERSION#/shared/"
        var apiBackOfficePerfix = "#WEB_API_WITH_VERSION#/backOffice/"
        var apiFrontOfficePerfix = "#WEB_API_WITH_VERSION#/"
        function addApiSharedPerfixURL(url) {
            return apiSharedPerfix + url;
        }
        function addApiBackOfficePerfixURL(url) {
            return apiBackOfficePerfix + url;
        }
        function addApiFrontOfficePerfixURL(url) {
            return apiFrontOfficePerfix + url;
        }
        var api = {
            shared: {
                get: function (url, config) {
                    url = addApiSharedPerfixURL(url);
                    return $http({ method: 'get', url: url, config: config });
                },
                post: function (url, data, config) {
                    url = addApiSharedPerfixURL(url);
                    return $http.post(url, data, config);
                },
                put: function (url, data, config) {
                    url = addApiSharedPerfixURL(url);
                    return $http.put(url, data, config);
                },
                delete: function (url, config) {
                    url = addApiSharedPerfixURL(url);
                    return $http.delete(url, config);
                }
            },
            backOffice: {
                get: function (url, config) {
                    url = addApiBackOfficePerfixURL(url);
                    return $http.get(url, config);
                },
                post: function (url, data, config) {
                    url = addApiBackOfficePerfixURL(url);
                    return $http.post(url, data, config);
                },
                put: function (url, data, config) {
                    url = addApiBackOfficePerfixURL(url);
                    return $http.put(url, data, config);
                },
                delete: function (url, config) {
                    url = addApiBackOfficePerfixURL(url);
                    return $http.delete(url, config);
                }
            },
            frontOffice: {
                get: function (url, config) {
                    url = addApiFrontOfficePerfixURL(url);
                    return $http.get(url, config);
                },
                post: function (url, data, config) {
                    url = addApiFrontOfficePerfixURL(url);
                    return $http.post(url, data, config);
                },
                put: function (url, data, config) {
                    url = addApiFrontOfficePerfixURL(url);
                    return $http.put(url, data, config);
                },
                delete: function (url, config) {
                    url = addApiFrontOfficePerfixURL(url);
                    return $http.delete(url, config);
                }
            }
        };
        return api;
    }]);
app.factory('formValidation', ['messageBox', '$rootScope',
    function (messageBox, $rootScope) {
        var formValidation = {
            showErrors: function (form) {
                angular.forEach(form.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        errorField.$pristine = false;
                    })
                });
                messageBox.error($rootScope.c.validationError);
            }
        };

        return formValidation;
    }
]);
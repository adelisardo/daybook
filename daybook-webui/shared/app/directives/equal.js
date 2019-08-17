app.directive('equal', function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=equal"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.equal = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});
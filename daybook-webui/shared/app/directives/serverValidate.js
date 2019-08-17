app.directive('serverValidate', [
    function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var validate = attr.serverValidate;
                var form = element.inheritedData('$formController');
                if (!form) return;

                scope.$watch(validate, function (iv, o) {
                    if (iv !== o) {
                        $('.label-server-validate').remove();
                        $('.has-error').removeClass('has-error');
                        if (iv && iv.inputValidations) {
                            angular.forEach(iv.inputValidations, function (value, key) {
                                //convert Example "IndexItems[0].Score" to "IndexItems0 #Score"
                                var realId = key.replace("[", "").replace("].", " #");
                                //space at end is more important
                                $('#' + realId).parent().append('<span class="label label-danger label-server-validate">' + value + '</span> ');
                                $('#' + realId).parent().addClass('has-error');
                            });
                        }
                    }
                });
            }
        };
    }
]);
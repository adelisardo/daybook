app.factory('messageBox', ['$rootScope', '$injector',
    function ($rootScope, $injector) {
        var notification = null;
        var getNotification = function () {
            if (!notification) {
                notification = $injector.get('Notification');
            }
            return notification;
        };

        var messageBox = {
            primary: function (args) { getNotification().primary(args); },
            info: function (args) { getNotification().info(args); },
            success: function (args) { getNotification().success(args); },
            warning: function (args) { getNotification().warning(args); },
            error: function (args) { getNotification().error(args); },
            createdSuccess: function () { getNotification().success($rootScope.c.createSuccess); },
            updatedSuccess: function () { getNotification().success($rootScope.c.updateSuccess); },
            deletedSuccess: function () { getNotification().success($rootScope.c.deleteSuccess); },
        };

        return messageBox;
    }]);
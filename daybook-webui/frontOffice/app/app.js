'use strict';

var app = angular.module('daybookApp', ['ngRoute', 'templates', 'ui.bootstrap', 'ngConfirmModule', 'focus-if', 'LocalStorageModule', 'ui-notification']);
app.config(['$routeProvider', '$locationProvider', '$httpProvider', '$logProvider', '$uibTooltipProvider', 'NotificationProvider',
    function ($routeProvider, $locationProvider, $httpProvider, $logProvider, $uibTooltipProvider, NotificationProvider) {

        $uibTooltipProvider.options({
            placement: 'bottom'
        });
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 8,
            horizontalSpacing: 8,
            positionX: 'right',
            positionY: 'bottom',
            replaceMessage: true
        });

        $logProvider.debugEnabled(false);

        $routeProvider
            .when('/', {
                templateUrl: '/home.html',
                controller: 'homeController',
                menuKey: 'home'
            })
            .when('/memories/:id', {
                templateUrl: '/memoriesEdit.html',
                controller: 'memoriesEditController',
                menuKey: 'memories'
            })
            .otherwise({
                redirectTo: '/'
            });

        $httpProvider.interceptors.push('httpInterceptor');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);
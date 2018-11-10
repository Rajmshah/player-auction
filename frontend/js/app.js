// Link all the JS Docs here
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ui.select',
    'angularPromiseButtons',
    'toastr',
    'ui.swiper'
]);

// Define all the routes below
myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    var tempateURL = "views/template/template.html"; //Default Template URL

    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: tempateURL,
            controller: 'HomeCtrl'
        })
        .state('about', {
            url: "/aboutus",
            templateUrl: tempateURL,
            controller: 'AboutCtrl'
        })
        .state('sponsor', {
            url: "/sponsor",
            templateUrl: tempateURL,
            controller: 'SponsorCtrl'
        })
        .state('links', {
            url: "/links",
            templateUrl: tempateURL,
            controller: 'LinksCtrl'
        })
        .state('teamdetail', {
            url: "/team/:id",
            templateUrl: tempateURL,
            controller: 'TeamCtrl'
        })
        .state('categorydetail', {
            url: "/category/:id",
            templateUrl: tempateURL,
            controller: 'CategoryCtrl'
        })
        .state('soldplayers', {
            url: "/soldplayers",
            templateUrl: tempateURL,
            controller: 'SoldPlayersCtrl'
        })
        .state('livestats', {
            url: "/livestats",
            templateUrl: tempateURL,
            controller: 'LiveStatsCtrl'
        });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});

// For Language JS
myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});
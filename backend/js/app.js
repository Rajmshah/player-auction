// JavaScript Document
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'imageupload',
    "ngMap",
    "internationalPhoneNumber",
    'ui.bootstrap',
    'ui.select',
    'ngAnimate',
    'toastr',
    'textAngular',
    'ngSanitize',
    'ngMap',
    'toggle-switch',
    'cfp.hotkeys',
    'ui.sortable'
]);

myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider

        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/template.html",
            controller: 'DashboardCtrl',
        })

        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

        .state('page', {
            url: "/page/:id/{page:.*}/{keyword:.*}",
            templateUrl: "views/template.html",
            controller: 'PageJsonCtrl'
        })

        .state('loginapp', {
            url: "/login/:id",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

        .state('country-list', {
            url: "/country-list/{page:.*}/{keyword:.*}",
            templateUrl: "views/template.html",
            controller: 'CountryCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createcountry', {
            url: "/country-create",
            templateUrl: "views/template.html",
            controller: 'CreateCountryCtrl'
        })

        .state('editcountry', {
            url: "/country-edit/:id",
            templateUrl: "views/template.html",
            controller: 'EditCountryCtrl'
        })

        .state('schema-creator', {
            url: "/schema-creator",
            templateUrl: "views/template.html",
            controller: 'SchemaCreatorCtrl'
        })

        .state('excel-upload', {
            url: "/excel-upload/:model",
            templateUrl: "views/template.html",
            controller: 'ExcelUploadCtrl'
        })

        .state('jagz', {
            url: "/jagz",
            templateUrl: "views/jagz.html",
            controller: 'JagzCtrl'
        })


        //ACTUAL PAGES
        .state('auction', {
            url: "/auction",
            templateUrl: "views/template.html",
            controller: 'AuctionCtrl'
        })
        //home page
        .state('homepage', {
            url: "/homepage",
            templateUrl: "views/template.html",
            controller: 'HomePageTableCtrl'
        })
        //detail home page
        .state('detailhomepage', {
            url: "/detailhomepage/:id",
            templateUrl: "views/template.html",
            controller: 'HomePageDetailsCtrl'
        })
        //Team List
        .state('teamlist', {
            url: "/teamlist",
            templateUrl: "views/template.html",
            controller: 'TeamListTableCtrl'
        })
        //detail Team List
        .state('detailteamlist', {
            url: "/detailteamlist/:id",
            templateUrl: "views/template.html",
            controller: 'TeamListDetailsCtrl'
        })
        //Team Player List
        .state('teamplayerlist', {
            url: "/teamplayerlist",
            templateUrl: "views/template.html",
            controller: 'TeamPlayerListTableCtrl'
        })
        //detail Team Player List
        .state('detailteamplayerlist', {
            url: "/detailteamplayerlist/:id",
            templateUrl: "views/template.html",
            controller: 'TeamPlayerListDetailsCtrl'
        })
        //Team Details
        .state('teamdetails', {
            url: "/teamdetails",
            templateUrl: "views/template.html",
            controller: 'TeamDetailsTableCtrl'
        })
        //Team Details
        .state('detailteamdetails', {
            url: "/detailteamdetails/:id",
            templateUrl: "views/template.html",
            controller: 'TeamDetailsCtrl'
        })
        //category List
        .state('categorylist', {
            url: "/categorylist",
            templateUrl: "views/template.html",
            controller: 'CategoryListTableCtrl'
        })
        //detail category List
        .state('detailcategorylist', {
            url: "/detailcategorylist/:id",
            templateUrl: "views/template.html",
            controller: 'CategoryListDetailsCtrl'
        })
        //category Details
        .state('categorydetails', {
            url: "/categorydetails",
            templateUrl: "views/template.html",
            controller: 'CategoryDetailsTableCtrl'
        })
        //detail category Details
        .state('detailcategorydetails', {
            url: "/detailcategorydetails/:id",
            templateUrl: "views/template.html",
            controller: 'CategoryDetailsCtrl'
        })
        //detail category Details
        .state('viewcategorydetails', {
            url: "/viewcategorydetails/:id",
            templateUrl: "views/template.html",
            controller: 'ViewCategoryDetailsCtrl'
        })
        //sponsor
        .state('sponsor', {
            url: "/sponsor",
            templateUrl: "views/template.html",
            controller: 'SponsorTableCtrl'
        })
        //detail sponsor
        .state('detailsponsor', {
            url: "/detailsponsor/:id",
            templateUrl: "views/template.html",
            controller: 'SponsorDetailsCtrl'
        });
    $urlRouterProvider.otherwise("/dashboard");
    $locationProvider.html5Mode(isproduction);
});

myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});
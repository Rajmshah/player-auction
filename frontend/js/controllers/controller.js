myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $uibModal) {
        $scope.template = TemplateService.getHTML("content/home.html");
        TemplateService.title = "Home"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();


        $scope.suppliers = [{
            name: "Casey Slusse",
            supplier: "Regular Fit Cotton Top",
            invoice: "#1024587 invoice is Pending",
            img: 'img/mike.png'
        }, {
            name: " Dee Schlatter",
            supplier: "Regular Fit Cotton Top",
            invoice: "#1024588 invoice is Pending",
            img: 'img/mike.png'
        }, {
            name: " Byron Mccully",
            supplier: "Regular Fit Cotton Top",
            invoice: "#1024589 invoice is Pending",
            img: 'img/mike.png'
        }, {
            name: " Prince Stucky",
            supplier: "Regular Fit Cotton Top",
            invoice: "#1024590 invoice is Pending",
            img: 'img/mike.png'
        }];





        $scope.submitForm = function (data) {
            console.log("This is it");
            return new Promise(function (callback) {
                $timeout(function () {
                    callback();
                }, 5000);
            });
        };


        $scope.rate = 7;
        $scope.max = 10;
        $scope.isReadonly = false;

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [{
                stateOn: 'glyphicon-ok-sign',
                stateOff: 'glyphicon-ok-circle'
            },
            {
                stateOn: 'glyphicon-star',
                stateOff: 'glyphicon-star-empty'
            },
            {
                stateOn: 'glyphicon-heart',
                stateOff: 'glyphicon-ban-circle'
            },
            {
                stateOn: 'glyphicon-heart'
            },
            {
                stateOff: 'glyphicon-off'
            }
        ];

        //modal example
        $scope.modalOpen = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/content/modal.html',
                size: 'sm',
                controller: function ($scope) {
                    $scope.name = 'bottom';
                }
            });
        };


    })

    .controller('LinksCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
        $scope.template = TemplateService.getHTML("content/links.html");
        TemplateService.title = "Links"; // This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
    })

    // Example API Controller
    .controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
        apiService.getDemo($scope.formData, function (data) {
            console.log(data);
        });
    });
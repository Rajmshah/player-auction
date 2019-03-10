myApp.controller("SponsorCtrl", function(
  $scope,
  TemplateService,
  NavigationService,
  $timeout,
  toastr,
  $http
) {
  $scope.template = TemplateService.getHTML("content/sponsor.html");
  TemplateService.title = "Sponsors"; // This is the Title of the Website
  $scope.navigation = NavigationService.getNavigation();
  $scope.adminurl = adminurl;

  $scope.getlist = function() {
    var constraints = {};
    var url = "Sponsor/getlist";
    NavigationService.getlist(url, function(data) {
      $scope.sponsorList = data.data;
    });
  };

  $scope.getBannerByPageName = function() {
    var constraints = {};
    constraints.pageName = "Sponsor";
    var url = "Banner/getBannerByPageName";
    NavigationService.getBannerByPageName(url, constraints, function(data) {
      $scope.banner = data.data[0];
      $scope.wholePage = data.data[0].isWhole;
      if ($scope.wholePage == false) {
        $scope.getlist();
      }
    });
  };
  $scope.getBannerByPageName();
});

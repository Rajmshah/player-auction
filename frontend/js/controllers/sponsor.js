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
});

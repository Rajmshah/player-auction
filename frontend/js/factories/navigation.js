var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;

myApp.factory("NavigationService", function($http) {
  return {
    getNavigation: function() {
      // return navigation;
    },
    apiCall: function(url, formData, callback) {
      $http.post(adminurl + url, formData).then(function(data) {
        data = data.data;
        callback(data);
      });
    },
    getBannerByPageName: function(url, formData, callback) {
      $http.post(adminurl + url, formData).then(function(data) {
        data = data.data;
        callback(data);
      });
    }
  };
});

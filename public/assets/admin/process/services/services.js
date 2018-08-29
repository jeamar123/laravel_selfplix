var appService = angular.module('appService', [])

appService.factory('appModule', function( serverUrl, $http, Upload ){
  var appFactory = {};
  
  appFactory.loginAdmin = function( data ) {
    return $http.post(serverUrl.url + 'api/admin/login', data);
  };

  appFactory.signupUser = function( data ) {
    return $http.post(serverUrl.url + 'api/signup', data);
  };

  appFactory.getTransactions = function( ) {
    return $http.get(serverUrl.url + 'api/admin/get_transactions');
  };

  appFactory.getUsers = function( ) {
    return $http.get(serverUrl.url + 'api/admin/get_users');
  };

  appFactory.getPosts = function( ) {
    return $http.get(serverUrl.url + 'api/admin/get_posts');
  };




  return appFactory;
});
var appService = angular.module('appService', [])

appService.factory('appModule', function( serverUrl, $http, Upload ){
  var appFactory = {};
  
  appFactory.loginUser = function( data ) {
    return $http.post(serverUrl.url + 'api/login', data);
  };

  appFactory.signupUser = function( data ) {
    return $http.post(serverUrl.url + 'api/signup', data);
  };

  

  appFactory.addSelfie = function( data ) {
    return Upload.upload({
        url: serverUrl.url + 'api/add_selfie',
        data: data
    });
  };

  appFactory.addLikeToSelfie = function( data ) {
    return $http.post(serverUrl.url + 'api/like_selfie', data);
  };

  appFactory.removeLikeToSelfie = function( data ) {
    return $http.post(serverUrl.url + 'api/unlike_selfie', data);
  };


  appFactory.searchUsers = function( data ) {
    return $http.post(serverUrl.url + 'api/search_user', data);
  };


  appFactory.getUserInfo = function( id ) {
    return $http.get(serverUrl.url + 'api/get_user_info/' + id );
  };

  appFactory.getSearchUserInfo = function( data ) {
    return $http.post(serverUrl.url + 'api/get_search_user_info', data );
  };

  appFactory.updateProfile = function( data ) {
    return Upload.upload({
        url: serverUrl.url + 'api/update_user',
        data: data
    });
  };

  appFactory.getUserPosts = function( data ) {
    return $http.post(serverUrl.url + 'api/get_posts', data);
  };

  appFactory.deleteUserPost = function( id, user_id ) {
    return $http.get(serverUrl.url + 'api/delete_post/' + id + '/' + user_id);
  };

  appFactory.getUserFeed = function( id ) {
    return $http.get(serverUrl.url + 'api/get_feed/' + id);
  };

  appFactory.followUnfollowUser = function( data ) {
    return $http.post(serverUrl.url + 'api/follow_unfollow_user', data);
  };

  appFactory.getAllRankings = function( ) {
    return $http.get(serverUrl.url + 'api/get_all_rankings');
  };

  appFactory.getUserTransactionList = function( id ) {
    return $http.get(serverUrl.url + 'api/get_transactions_user/' + id);
  };

  appFactory.addTransaction = function( data ) {
    return $http.post(serverUrl.url + 'api/add_transaction' , data);
  };



  return appFactory;
});
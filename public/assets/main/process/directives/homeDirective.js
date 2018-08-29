app.directive('homeDirective', [
  '$http',
  '$state',
  '$stateParams',
  '$rootScope',
  'appModule',
  'sessionFactory',
  function directive($http,$state,$stateParams,$rootScope,appModule,sessionFactory) {
    return {
      restrict: "A",
      scope: true,
      link: function link( scope, element, attributeSet )
      {
        console.log( "homeDirective Runinng !" );

        scope.user_data = null;
        scope.user_feed = [];

        scope.goToUser = ( list ) =>{
          if( list.user_id == scope.user_data.id ){
            $state.go( 'profile' );
          }else{
            $state.go( 'profile', { user : list.user_id } );
          }
        }

        scope.heartOption = ( post ) =>{
          if( !post.isLiked ){
            scope.likePost( post );
          }else{
            scope.unlikePost( post );
          }
        }

        scope.likePost = ( post ) =>{
          var data = {
            user_id : scope.user_data.id,
            post : post,
          }
          appModule.addLikeToSelfie( data )
            .then(function(response){
              console.log( response );
              if( response.data.status == true ){
                post.isLiked = true;
                post.likes += 1;
              }else{
                swal('Error!', response.data.message, 'error');
              }
            });
        }

        scope.unlikePost = ( post ) =>{
          var data = {
            user_id : scope.user_data.id,
            post : post,
          }
          appModule.removeLikeToSelfie( data )
            .then(function(response){
              console.log( response );
              if( response.data.status == true ){
                post.isLiked = false;
                post.likes -= 1;
              }else{
                swal('Error!', response.data.message, 'error');
              }
            });
        }

        scope.getPostedDate = ( date_created ) =>{
          var date = moment( date_created ).fromNow();
          return date;
        }

        scope.getHomeFeed = ( ) =>{
          appModule.getUserFeed( sessionFactory.getSession() )
            .then(function(response){
              console.log( response );
              scope.user_feed = response.data;
              scope.toggleLoading();
            });
        }

        scope.getUserData = () =>{
          scope.toggleLoading();
          appModule.getUserInfo( sessionFactory.getSession() )
            .then(function(response){
              console.log(response);
              scope.user_data = response.data;
              scope.getHomeFeed();
            });
        }

        

        var isLoading = false;

        scope.toggleLoading = ( ) =>{
          if( isLoading == true ){
            isLoading = false;
            setTimeout(function() {
              $(".body-loader").fadeOut("slow");
            }, 300);
          }else{
            $(".body-loader").show();
            isLoading = true;
          }
        }

        scope.onLoad = ( ) =>{
          if( sessionFactory.getSession() != null ){
            scope.getUserData();
          }
          
          setTimeout(function() {
            $(".body-loader").fadeOut("slow");
          }, 1000);
        }

        scope.onLoad();

      }
    }


  }
])
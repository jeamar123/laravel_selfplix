
app.directive('profileDirective', [
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
        console.log( "profileDirective Runinng !" );

        scope.isUserSearch = (( $stateParams.user == "" ) ? false : ( $stateParams.user == sessionFactory.getSession() ) ? false : true );
        scope.user_data = null;
        scope.user_post = [];
        scope.isEditProfileShow = false;
        scope.update_user_image = null;
        scope.selected_post = {};
        scope.following_arr = [];
        scope.followers_arr = [];

        scope.getPostedDate = ( date_created ) =>{
          var date = moment( date_created ).fromNow();
          return date;
        }

        scope.toggleEditProfile = ( ) =>{
          if( scope.isEditProfileShow == false ){
            scope.isEditProfileShow = true;
          }else{
            scope.isEditProfileShow = false;
          }
        }

        scope.setNewProfilePhoto = ( file ) =>{
          if( file != null ){
            scope.update_user_image = file;
          }
        }

        scope.userPostSelected = ( data ) =>{
          console.log(data);
          scope.selected_post = data;
          $('#showPostModal').modal( 'show' );
        }

        scope.logout = ( ) =>{
          swal({
            title: "Confirm",
            text: "are you sure you want to logout?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-top"
          }, function(isTrue){
            if(isTrue){
              scope.toggleLoading();
              sessionFactory.unsetSession();
              gapi.auth2.getAuthInstance().signOut();
              $state.go('auth');
            }
          });
        }

        scope.heartOption = ( post ) =>{
          if( !post.isLiked ){
            scope.likePost( post );
          }else{
            scope.unlikePost( post );
          }
        }

        ///// HTTP REQUESTS

        scope.likePost = ( post ) =>{
          var data = {
            user_id : sessionFactory.getSession(),
            post : post,
          }
          appModule.addLikeToSelfie( data )
            .then(function(response){
              // console.log( response );
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
            user_id : sessionFactory.getSession(),
            post : post,
          }
          appModule.removeLikeToSelfie( data )
            .then(function(response){
              // console.log( response );
              if( response.data.status == true ){
                post.isLiked = false;
                post.likes -= 1;
              }else{
                swal('Error!', response.data.message, 'error');
              }
            });
        }

        scope.followUpdateUser = ( user ) =>{
          scope.showLoading();
          var data = {
            user_id : sessionFactory.getSession(),
            friend_id : user.id,
            isFollow : ( user.isFollowed == true ) ? false : true
          }
          appModule.followUnfollowUser( data )
            .then(function(response){
              // console.log( response );
              if( response.data.status == true ){
                user.isFollowed = ( user.isFollowed == true ) ? false : true;
                user.followers = ( user.isFollowed == true ) ? user.followers + 1 : user.followers - 1;
              }
              scope.hideLoading();
            });
        }

        scope.updateProfileInfo = ( data ) =>{
          scope.toggleLoading();
          if( scope.update_user_image != null ){
            data.file = scope.update_user_image;
          }

          appModule.updateProfile( data )
            .then(function(response){
              console.log( response );
              scope.toggleLoading();
              if( response.data.status == true ){
                scope.user_data = response.data.user;
                swal('Success!', 'Profile updated.', 'success');
              }else{
                swal('Error!', response.data.message, 'error');
              }
            });
        }

        scope.deletePost = ( post_id ) =>{
          swal({
            title: "Confirm",
            text: "are you sure you want to delete this post?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-top"
          }, function(isTrue){
            if(isTrue){
              scope.toggleLoading();
              appModule.deleteUserPost( post_id, scope.user_data.id )
                .then(function(response){
                  console.log( response );
                  scope.toggleLoading();
                  if( response.data.status == true ){
                    swal('Success!', 'Post deleted.', 'success');
                    $('.post-settings-drop-box').hide();
                    $('#showPostModal').modal( 'hide' );
                    scope.onLoad();
                  }else{
                    swal('Error!', response.data.message, 'error');
                  }
                });
            }
          });
        }

        scope.getPosts = ( id ) =>{
          scope.user_post = [];
          var data ={
            user_id : id,
            session_id : sessionFactory.getSession()
          }
          appModule.getUserPosts( data )
            .then(function(response){
              // console.log( response );
              scope.user_post = response.data;
            });
        }

        scope.getFollowers = ( id ) =>{
          appModule.getUserFollowers( id )
            .then(function(response){
              // console.log( response );
              scope.followers_arr = response.data.followers;
              scope.toggleLoading();
            });
        }

        scope.getFollowings = ( id ) =>{
          appModule.getUserFollowings( id )
            .then(function(response){
              // console.log( response );
              scope.following_arr = response.data.followings;
              scope.toggleLoading();  
            });
        }

        scope.getSearchUserData = () =>{
          scope.toggleLoading();
          var data = {
            user_id : sessionFactory.getSession(),
            friend_id : $stateParams.user
          }
          appModule.getSearchUserInfo( data )
            .then(function(response){
              console.log( response );
              scope.user_data = response.data;
              scope.getPosts( $stateParams.user );
              scope.getFollowings( $stateParams.user );
              scope.getFollowers( $stateParams.user );
            });
        }

        scope.getUserData = () =>{
          scope.toggleLoading();
          appModule.getUserInfo( sessionFactory.getSession() )
            .then(function(response){
              // console.log( response );
              scope.user_data = response.data;
              scope.getPosts( sessionFactory.getSession() );
              scope.getFollowings( sessionFactory.getSession() );
              scope.getFollowers( sessionFactory.getSession() );
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

        scope.showLoading = ( ) =>{
          $(".body-loader").show();
          isLoading = true;
        }

        scope.hideLoading = ( ) =>{
          isLoading = false;
          setTimeout(function() {
            $(".body-loader").fadeOut("slow");
          }, 300);
        }

        scope.onLoad = ( ) =>{
          ( scope.isUserSearch ) ? scope.getSearchUserData() : scope.getUserData();

          setTimeout(function() {
            $(".body-loader").fadeOut("slow");
          }, 1000);
        }

        scope.onLoad();

        scope.initGoogleAuth = ( ) =>{
          gapi.client.init({
              apiKey: 'AIzaSyDVDGbrc2hjtOAfnVXV1aZn2QgTU6ubXbA',
              discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
              clientId: '1005628683520-3ntkl0sfsjv9pfpvl0hd2emfr6r4rpsi.apps.googleusercontent.com',
              scope: 'profile'
          }).then(function(res) {
            console.log(res);
          }).then(function(response) {
            if( gapi.auth2.getAuthInstance().isSignedIn.get() == false ){
              console.log('No google user logged in.');
            }
          }, function(reason) {
            console.log( reason );
          });
          
        }

        gapi.load('client', scope.initGoogleAuth);

        $( ".user-post-options" ).delegate( '#userSettingsClicked' , 'click' , function(e){
          console.log('sdfsdf');
          $(this).closest('.user-post-options').find('.post-settings-drop-box').show();
        });

        $("body").click(function(e){
          var classStr = $(e.target).attr('class'),
              lastClass = ( classStr ) ? classStr.substr( classStr.lastIndexOf(' ') + 1) : null;
          if ( $(e.target).parents(".post-settings-drop-box").length === 0 && lastClass != 'user-options') {
            $('.post-settings-drop-box').closest('.user-post-options').find('.post-settings-drop-box').hide();
          }
        });

      }
    }


  }
])
app.directive('headerDirective', [
  '$http',
  '$state',
  '$stateParams',
  '$rootScope',
  'appModule',
  'sessionFactory',
  '$sce',
  function directive($http,$state,$stateParams,$rootScope,appModule,sessionFactory,$sce) {
    return {
      restrict: "A",
      scope: true,
      link: function link( scope, element, attributeSet )
      {
        console.log( "headerDirective Runinng !" );

        scope.user_data = null;
        scope.userSearchText = null;
        scope.searchBoxShow = false;
        scope.notifBoxShow = false;
        scope.user_search_list = [];
        scope.user_notifications = [];
        scope.notifs_active = 0;

        scope.toTrustedHTML = function( html ){
          
          return $sce.trustAsHtml( html );
        }

        scope.getPostedDate = ( date_created ) =>{
          var date = moment( date_created ).fromNow();
          return date;
        }

        scope.toggleNotif = ( ) =>{
          var body_width = $("body").width();
          if( body_width < 770 ){
            $state.go('notifications');
          }else{
            if( scope.notifBoxShow == false ){
              $('.notifications-container').show();
              scope.notifBoxShow = true;
            }else{
              $('.notifications-container').hide();
              scope.notifBoxShow = false;
            }
          }
        }

        scope.selectUserSearched = ( user ) =>{
          if( user.id == scope.user_data.id ){
            $state.go( 'profile' );
          }else{
            $state.go( 'profile', { user : user.id } );
          }
        }

        scope.searchChanged = ( text ) =>{
          if( text.length > 0 ){
            scope.searchBoxShow = true;
            var data = {
              search : text,
              user_id : scope.user_data.id
            }
            appModule.searchUsers( data )
              .then(function(response){
                // console.log(response);
                if( response.data.status == true ){
                  scope.user_search_list = response.data.users;
                }
              });
          }else{
            scope.searchBoxShow = false;
            scope.user_search_list = [];
          }
        }

        scope.updateNotif = ( notif ) =>{
          if( notif.status == false ){
            appModule.setNotifToSeen( notif.id )
              .then(function(response){
                console.log(response);
                if( response.data.status ){
                  notif.status = true;
                  scope.notifs_active -= 1;
                }
              });
          }
        }

        scope.getUserNotifs = ( id ) =>{
          appModule.getNotifs( id )
            .then(function(response){
              console.log(response);
              scope.user_notifications = response.data.notifications;

              if( scope.user_notifications.length > 0 ){
                angular.forEach( scope.user_notifications , function( value, key ) {
                  if( value.status == false ){
                    scope.notifs_active += 1;
                  }
                });
              }
            });
        }

        scope.getUserData = () =>{
          appModule.getUserInfo( sessionFactory.getSession() )
            .then(function(response){
              scope.user_data = response.data;
              scope.getUserNotifs( scope.user_data.id );
            });
        }

        scope.onLoad = ( ) =>{
          if( sessionFactory.getSession() != null ){
            scope.getUserData();
          }
        }

        scope.onLoad();

        $("body").click(function(e){
          if ( $(e.target).parents(".notif").length === 0 && $(e.target).parents(".notifications-container").length === 0 ) {
            scope.notifBoxShow = false;
            $('.notifications-container').hide();
          }
        });

      }
    }


  }
])
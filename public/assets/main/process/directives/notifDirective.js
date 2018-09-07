app.directive('notifDirective', [
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
        console.log( "notifDirective Runinng !" );

        scope.user_data = null;
        scope.user_notifications = [];

        scope.toTrustedHTML = function( html ){
          
          return $sce.trustAsHtml( html );
        }

        scope.getPostedDate = ( date_created ) =>{
          var date = moment( date_created ).fromNow();
          return date;
        }

        scope.updateNotif = ( notif ) =>{
          if( notif.status == false ){
            appModule.setNotifToSeen( notif.id )
              .then(function(response){
                console.log(response);
                if( response.data.status ){
                  notif.status = true;
                }
              });
          }
        }

        scope.getUserNotifs = ( id ) =>{
          appModule.getNotifs( id )
            .then(function(response){
              console.log(response);
              scope.user_notifications = response.data.notifications;
              scope.toggleLoading();
            });
        }

        scope.getUserData = () =>{
          scope.toggleLoading();
          appModule.getUserInfo( sessionFactory.getSession() )
            .then(function(response){
              scope.user_data = response.data;
              scope.getUserNotifs( scope.user_data.id );
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
        }

        scope.onLoad();

      }
    }
  }
])
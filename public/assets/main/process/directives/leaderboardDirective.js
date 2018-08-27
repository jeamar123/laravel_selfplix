app.directive('leaderboardDirective', [
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
        console.log( "leaderboardDirective Runinng !" );

        scope.user_data = null;
        scope.selfie_rankings = [];

        scope.getRankings = ( ) =>{
          appModule.getAllRankings( )
            .then(function(response){
              console.log( response );
              scope.selfie_rankings = response.data.rankings;
              scope.toggleLoading();
            });
        }

        scope.getUserData = () =>{
          scope.toggleLoading();
          appModule.getUserInfo( sessionFactory.getSession() )
            .then(function(response){
              scope.user_data = response.data;
              scope.getRankings();
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
          // scope.getUserData();
          scope.getRankings();

          setTimeout(function() {
            // $(".body-loader").fadeOut("slow");
            scope.toggleLoading();
          }, 1000);
        }

        scope.onLoad();

      }
    }


  }
])
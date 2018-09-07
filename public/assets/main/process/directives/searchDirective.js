app.directive('searchDirective', [
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
        console.log( "searchDirective Runinng !" );

        scope.user_data = null;
        scope.userSearchText = null;
        scope.searchBoxShow = false;
        scope.user_search_list = [];
        scope.search_no_user = false;

        scope.searchChanged = ( text ) =>{
          if( text.length > 0 ){
            
            var data = {
              search : text,
              user_id : scope.user_data.id
            }
            appModule.searchUsers( data )
              .then(function(response){
                console.log(response);
                if( response.data.status == true ){
                  scope.user_search_list = response.data.users;

                  if( scope.user_search_list.length == 0 ){
                    scope.search_no_user = true;
                    scope.searchBoxShow = false;
                  }else{
                    scope.search_no_user = false;
                    scope.searchBoxShow = true;
                  }
                }
              });
          }else{
            scope.searchBoxShow = false;
            scope.user_search_list = [];
          }
        }

        scope.selectUserSearched = ( user ) =>{
          if( user.id == scope.user_data.id ){
            $state.go( 'profile' );
          }else{
            $state.go( 'profile', { user : user.id } );
          }
        }

        scope.getUserData = () =>{
          scope.toggleLoading();
          appModule.getUserInfo( sessionFactory.getSession() )
            .then(function(response){
              scope.user_data = response.data;
              scope.toggleLoading();
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
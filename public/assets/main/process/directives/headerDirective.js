app.directive('headerDirective', [
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
        console.log( "headerDirective Runinng !" );

        scope.user_data = null;
        scope.userSearchText = null;
        scope.searchBoxShow = false;
        scope.user_search_list = [];

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

        scope.getUserData = () =>{
          appModule.getUserInfo( sessionFactory.getSession() )
            .then(function(response){
              scope.user_data = response.data;
            });
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
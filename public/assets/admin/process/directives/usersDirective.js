app.directive('usersDirective', [
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
        console.log( "usersDirective Runinng !" );

        scope.users_arr = [];

        scope.fetchUsers = ( ) =>{
          appModule.getUsers()
            .then(function(response){
              console.log(response);
              if( response.data.status == true ){
                scope.users_arr = response.data.users;
              }
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
          scope.fetchUsers();
        }

        scope.onLoad();

      }
    }


  }
])
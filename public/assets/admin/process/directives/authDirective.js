app.directive('authDirective', [
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
        console.log( "authDirective Runinng !" );

        scope.isSignupShow = false;
        scope.login_data = {};

        scope.login = ( login_data ) =>{
          if( login_data.email && login_data.password ){
            scope.toggleLoading();
            var data = {
              email: login_data.email,
              password: login_data.password
            }
            appModule.loginAdmin(data)
              .then(function(response) {
                console.log(response);
                scope.toggleLoading();
                if( response.data.status == true ){
                  scope.login_err = false;
                  sessionFactory.setSession( true );
                  $state.go('home');
                }else{
                  scope.login_err_msg = response.data.message;
                  scope.login_err = true;
                }
              });
          }
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
          scope.toggleLoading();

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
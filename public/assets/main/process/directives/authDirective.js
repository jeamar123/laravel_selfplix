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
        scope.signup_data = {};

        scope.checkEmail = (email) => {
          var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          return regex.test(email);
        }

        scope.toggleSignup = ( ) =>{
          if( scope.isSignupShow == false ){
            scope.isSignupShow = true;
          }else{
            scope.isSignupShow = false;
          }
        }

        scope.login = ( login_data ) =>{
          console.log(login_data);
          if( login_data.email && login_data.password ){
            scope.toggleLoading();
            var data = {
              email: login_data.email,
              password: login_data.password
            }
            appModule.loginUser(data)
              .then(function(response) {
                console.log(response);
                scope.toggleLoading();
                scope.login_err_msg = response.data.message;
                if( response.data.status == true ){
                  scope.login_err = false;
                  sessionFactory.setSession( response.data.user.id );
                  $state.go('home');
                }else{
                  scope.login_err = true;
                }
              });
          }
        }

        scope.signup = ( signup_data ) =>{
          console.log(signup_data);

          if( scope.checkEmail( signup_data.email ) == true ){
            scope.email_invalid_err = false;
            if( signup_data.password == signup_data.re_password ){
              scope.password_err = false;
              scope.toggleLoading();
              
              appModule.signupUser(signup_data)
                .then(function(response) {
                  console.log(response);
                  scope.toggleLoading();
                  if( response.data.status == true ){
                    scope.some_err = false;
                    scope.err_message = null;
                    scope.some_succ = true;
                    scope.signup_data = {};
                  }else{
                    scope.some_succ = false;
                    scope.some_err = true;
                    scope.err_message = response.data.message;
                  }
                });
            }else{
              scope.password_err = true;
            }
          }else{
            scope.email_invalid_err = true;
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
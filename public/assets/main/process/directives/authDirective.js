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
        scope.noUserLoggedIn = true;
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
          if( login_data.email && login_data.password ){
            scope.toggleLoading();
            var data = {
              email: login_data.email,
              password: login_data.password
            }
            appModule.loginUser(data)
              .then(function(response) {
                // console.log(response);
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

        scope.loginGoogle = ( google_data ) =>{
          scope.hideLoading();

          var data = {
            email: google_data.emailAddresses[0].value,
            name: google_data.names[0].displayName,
            username: (google_data.names[0].givenName).toLowerCase(),
            image: google_data.photos[0].url,
          }

          appModule.loginUserByGoogle(data)
            .then(function(response) {
              console.log(response);
              scope.hideLoading();
              if( response.data.status == true ){
                sessionFactory.setSession( response.data.user_id );
                $state.go('home');
              }else{
                swal('', response.data.message, 'error');
              }
            });
        }

        scope.signup = ( signup_data ) =>{
          if( scope.checkEmail( signup_data.email ) == true ){
            scope.email_invalid_err = false;
            if( signup_data.password == signup_data.re_password ){
              scope.password_err = false;
              scope.toggleLoading();
              
              appModule.signupUser(signup_data)
                .then(function(response) {
                  console.log(response);
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
                  scope.toggleLoading();
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

        scope.hideLoading = ( ) =>{
          isLoading = false;
          setTimeout(function() {
            $(".body-loader").fadeOut("slow");
          }, 300);
        }

        scope.showLoading = ( ) =>{
          isLoading = true;
          $(".body-loader").show();
        }

        scope.onLoad = ( ) =>{
          // scope.hideLoading();
        }

        scope.onLoad();



        scope.signOutWithGoogle = ( ) =>{
          gapi.auth2.getAuthInstance().signOut();
        }

        scope.signInWithGoogle = ( ) =>{
          gapi.auth2.getAuthInstance().signIn();
        }

        scope.updateSigninStatus = ( isSignedIn ) =>{
          if (isSignedIn) {
            scope.getSignInDetalis();
          }else{
            scope.noUserLoggedIn = true;
          }
        }

        scope.getSignInDetalis = ( ) =>{
          gapi.client.people.people.get({
            'resourceName': 'people/me',
            'personFields': 'emailAddresses,photos,nicknames,names'
          }).then(function(response) {
            // console.log(response.result);
            // console.log('Hello, ' + response.result.names[0].givenName);
            scope.loginGoogle( response.result );
          }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
          });
        }

        scope.initGoogleAuth = ( ) =>{
          gapi.client.init({
              apiKey: 'AIzaSyDVDGbrc2hjtOAfnVXV1aZn2QgTU6ubXbA',
              discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
              clientId: '1005628683520-3ntkl0sfsjv9pfpvl0hd2emfr6r4rpsi.apps.googleusercontent.com',
              scope: 'profile'
          }).then(function(res) {
            gapi.auth2.getAuthInstance().isSignedIn.listen(scope.updateSigninStatus);
            scope.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            // scope.signOutWithGoogle();
          }).then(function(response) {
            if( gapi.auth2.getAuthInstance().isSignedIn.get() == false ){
              console.log('No google user logged in.');
              scope.hideLoading();
            }
          }, function(reason) {
            console.log( reason );
          });
          
        }

        gapi.load('client', scope.initGoogleAuth);

      }
    }


  }
])
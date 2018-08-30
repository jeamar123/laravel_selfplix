app.directive('uploadDirective', [
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
        console.log( "uploadDirective Runinng !" );

        scope.user_data = null;

        scope.selfieImage = null;
        scope.selfieData = {
          caption : "",
          date : moment().fromNow(),
        }
        scope.upload_step = 1;

        scope.addSelfieImage = function( file ){
          scope.selfieImage = file;
        }

        scope.validateFile = ( file ) =>{
          if( file.type != "image/png" && file.type != "image/jpeg" ){
            swal({
              title: "Invalid File.",
              text: "",
              type: "error",
              showCancelButton: false,
              closeOnConfirm: true,
              animation: "slide-from-top"
            }, function(isTrue){
            });
            return false;
          }
        }

        scope.toggleStep = function( opt ){
          if( opt == 3 ){
            scope.submitSelfie();
          }else{
            scope.toggleLoading();
            scope.upload_step = opt;
            scope.toggleLoading();
          }
        }

        scope.submitSelfie = ( ) =>{
          var data = {
            user_id : scope.user_data.id,
            file : scope.selfieImage,
            caption : scope.selfieData.caption,
          }
          scope.showLoading();
          appModule.addSelfie( data )
            .then(function(response){
              console.log( response );
              if( response.data.status == true ){
                scope.upload_step = 1;
                swal({
                  title: "",
                  text: "Selfie successfully posted !",
                  type: "success",
                  showCancelButton: false,
                  closeOnConfirm: true,
                  animation: "slide-from-top"
                }, function(isTrue){
                  scope.selfieImage = null;
                  scope.selfieData = {
                    caption : "",
                    date : moment().fromNow(),
                  }
                  scope.hideLoading();
                  $state.go('home');
                });
              }else{
                swal({
                  title: response.data.message,
                  text: "",
                  type: "error",
                  showCancelButton: false,
                  closeOnConfirm: true,
                  animation: "slide-from-top"
                }, function(isTrue){
                  scope.hideLoading();
                });
              }
            });
        }

        scope.getUserData = () =>{
          scope.toggleLoading();
          appModule.getUserInfo( sessionFactory.getSession() )
            .then(function(response){
              scope.user_data = response.data;
            });
        }

        var isLoading = false;

        scope.hideLoading = ( ) =>{
          isLoading = false;
          setTimeout(function() {
            $(".body-loader").fadeOut("slow");
          }, 300);
        }

        scope.showLoading = ( ) =>{
          $(".body-loader").show();
          isLoading = true;
        }
 
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
          scope.getUserData();

          setTimeout(function() {
            $(".body-loader").fadeOut("slow");
          }, 1000);
        }

        scope.onLoad();

      }
    }


  }
])
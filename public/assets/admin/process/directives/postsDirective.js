app.directive('postsDirective', [
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
        console.log( "postsDirective Runinng !" );

        scope.posts_arr = [];

        scope.fetchPosts = ( ) =>{
          appModule.getPosts()
            .then(function(response){
              console.log(response);
              if( response.data.status == true ){
                scope.posts_arr = response.data.posts;
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
          scope.fetchPosts();
        }

        scope.onLoad();

      }
    }


  }
])
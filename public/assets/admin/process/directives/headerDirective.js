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

        scope.onLoad = ( ) =>{

        }

        scope.onLoad();

      }
    }


  }
])
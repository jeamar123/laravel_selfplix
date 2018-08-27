app.directive('transactionsDirective', [
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
        console.log( "transactionsDirective Runinng !" );

        scope.transactions_arr = [];

        scope.fetchTransactions = ( ) =>{
          appModule.getTransactions()
            .then(function(response){
              console.log(response);
              if( response.data.status == true ){
                scope.transactions_arr = response.data.transactions;
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
          scope.fetchTransactions();
        }

        scope.onLoad();

      }
    }


  }
])
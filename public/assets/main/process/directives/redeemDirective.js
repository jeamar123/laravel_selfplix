app.directive('redeemDirective', [
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
        console.log( "redeemDirective Runinng !" );

        scope.user_data = null;
        scope.isPageShow = 1;
        scope.transaction_list = [];
        scope.redeem_data = {};

        scope.showBox = ( opt ) =>{
          scope.isPageShow = opt;

          if( opt == 3 ){
            scope.getUserTransactions = () =>{
              appModule.getUserTransactionList( sessionFactory.getSession() )
                .then(function(response){
                  console.log(response);
                  scope.transaction_list = response.data.transactions;
                  scope.toggleLoading();
                });
            }
          }else{
            scope.redeem_data = {};
          }
        }

        scope.redeemTransaction = ( data ) =>{
          console.log( data );

          if( !data.payment_option || !data.amount || !data.name || !data.phone ){
            swal('Error!', 'Please fill up all inputs.', 'error');
            return false;
          }

          if( data.payment_option == 'BPI' && !data.account_number ){
            swal('Error!', 'Please fill up all inputs.', 'error');
            return false;
          }

          if( scope.user_data.points < data.amount ){
            swal('Error!', 'Redeem amount is larger than your points.', 'error');
            return false;
          }

          scope.toggleLoading();
          data.user_id = scope.user_data.id;

          appModule.addTransaction( data )
            .then(function(response){
              console.log(response);
              if( response.data.status == true ){
                swal('Success!', 'Transaction is still pending. Admin will verify it and notify you. Thanks', 'success');
                scope.redeem_data = {};
                scope.getUserData();
              }else{
                swal('Error!', response.data.message, 'error');
              }
              scope.toggleLoading();
            });
          
        }

        scope.getUserTransactions = () =>{
          appModule.getUserTransactionList( sessionFactory.getSession() )
            .then(function(response){
              console.log(response);
              scope.transaction_list = response.data.transactions;
              scope.toggleLoading();
            });
        }

        scope.insertReferralCode = ( code ) =>{
          if( !code ){
            swal('Error!', 'Please input referral code.', 'error');
            return false;
          }

          scope.toggleLoading();
          appModule.addReferralCode( sessionFactory.getSession(), code )
            .then(function(response){
              console.log(response);
              scope.toggleLoading();
              if( response.data.true ){
                scope.user_data.referred = true;
                swal('Success!', 'Referral code added.', 'success');
              }else{
                swal('Error!', response.data.message, 'error');
              }
            });
        }

        scope.getUserData = () =>{
          scope.toggleLoading();
          appModule.getUserInfo( sessionFactory.getSession() )
            .then(function(response){
              console.log(response);
              scope.user_data = response.data;
              scope.getUserTransactions();
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
app.controller('mainController', function( $state, $scope , $rootScope, $stateParams, appModule, sessionFactory){

	console.log( 'mainController running' );

	var vm = this;

	vm.isRightShown = false;

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    vm.current = toState.name;
  });

  vm.checkSession = () =>{
    if( sessionFactory.getSession() == null ){
      setTimeout(function() {
        $state.go('auth');
      }, 300);
    }
  }

	vm.onLoad = ( ) => {
		vm.checkSession();

		// setTimeout(function() {
  //     $(".body-loader").fadeOut("slow");
  //   }, 1000);
	}

	vm.onLoad();

});

app.factory('sessionFactory', function(localStorageService) {
  return {
      getSession: getSession,
      setSession: setSession,
      unsetSession: unsetSession,
  }

  function getSession(){
      return localStorageService.get('user_logged_in');
  }

  function setSession(data){
      localStorageService.set('user_logged_in',data);
  }

  function unsetSession(data){
      localStorageService.remove('user_logged_in');
  }
  
})
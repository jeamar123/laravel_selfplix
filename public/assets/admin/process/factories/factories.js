app.factory('sessionFactory', function(localStorageService) {
  return {
      getSession: getSession,
      setSession: setSession,
      unsetSession: unsetSession,
  }

  function getSession(){
      return localStorageService.get('admin_logged_in');
  }

  function setSession(data){
      localStorageService.set('admin_logged_in',data);
  }

  function unsetSession(data){
      localStorageService.remove('admin_logged_in');
  }
  
})
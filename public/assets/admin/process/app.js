var app = angular.module('app', ['ui.router','appService','ngFileUpload','LocalStorageModule']);

app.run([ '$rootScope', '$state', '$stateParams', '$templateCache', 
  function ($rootScope, $state, $stateParams, $templateCache) {
    
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      // console.log(toState);
      // console.log(toState.name);
    });
  }]);

app.factory('serverUrl',[
    function factory(){
      var base_url = window.location.origin + '/';
      return {
        url: base_url,
      }
    }
]);

app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('auth', {
      url: '/auth',
      cache : false,
      views: {
        'main': {
          templateUrl: '../assets/admin/templates/auth.html'
        }
      },
    })
    .state('home', {
      url: '/home',
      cache : false,
      views: {
        'header': {
          templateUrl: '../assets/admin/templates/header.html'
        },
        'main': {
          templateUrl: '../assets/admin/templates/home.html'
        },
      },
    })
    .state('home.dashboard', {
      url: '/dashboard',
      cache : false,
      views: {
        'home_content@home': {
          templateUrl: '../assets/admin/templates/dashboard.html'
        },
      },
    })
    .state('home.transactions', {
      url: '/transactions',
      cache : false,
      views: {
        'home_content@home': {
          templateUrl: '../assets/admin/templates/transactions.html'
        },
      },
    })
    .state('home.posts', {
      url: '/posts',
      cache : false,
      views: {
        'home_content@home': {
          templateUrl: '../assets/admin/templates/posts.html'
        },
      },
    })
    .state('home.users', {
      url: '/users',
      cache : false,
      views: {
        'home_content@home': {
          templateUrl: '../assets/admin/templates/users.html'
        },
      },
    });

    $urlRouterProvider.otherwise('/auth');
});


app.directive('validNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }

      ngModelCtrl.$parsers.push(function(val) {
        if (angular.isUndefined(val)) {
            var val = '';
        }
        var clean = val.replace(/[^0-9\.]/g, '');
        var decimalCheck = clean.split('.');

        if(!angular.isUndefined(decimalCheck[1])) {
            decimalCheck[1] = decimalCheck[1].slice(0,2);
            clean =decimalCheck[0] + '.' + decimalCheck[1];
        }

        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });

      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});

app.filter('cmdate', [
    '$filter', function($filter) {
        return function(input, format) {
            return $filter('date')(new Date(input), format);
        };
    }
]);

app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

app.filter('toArray', function () {
  return function (obj, addKey) {
    if (!angular.isObject(obj)) return obj;
    if ( addKey === false ) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    } else {
      return Object.keys(obj).map(function (key) {
        var value = obj[key];
        return angular.isObject(value) ?
          Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
          { $key: key, $value: value };
      });
    }
  };
});

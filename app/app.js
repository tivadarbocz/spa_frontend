(function () {
  'use strict';

  angular
      .module('app', ['ngRoute', 'ngCookies', 'ui.grid', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.bootstrap', 'ngFileUpload', 'ngTouch', 'ngAnimate' ,'ui.bootstrap','ngAnimate'])
      .config(config)
      .run(run);

  config.$inject = ['$routeProvider', '$locationProvider'];
  function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
          controller: 'HomeController',
          templateUrl: 'home/home.view.html',
          controllerAs: 'vm'
        })

        .when('/login', {
          controller: 'LoginController',
          templateUrl: 'login/login.view.html',
          controllerAs: 'vm'
        })

        .when('/personal', {
            controller: 'ProfileController',
            templateUrl: 'profile/profile.view.html',
            controllerAs: 'vm'

        }).when('/admin', {
            controller: 'AdminController',
            templateUrl: 'admin/admin.view.html',
            controllerAs: 'vm'
        })

        .otherwise({redirectTo: '/login'});
  }

  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
  function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['X-AUTH-TOKEN'] = $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/forgot']) === -1;
      var loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
        $location.path('/login');
      }
    });
  }
})();
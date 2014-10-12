'use strict';

/**
 * @ngdoc overview
 * @name tarjetasOpacasApp
 * @description
 * # tarjetasOpacasApp
 *
 * Main module of the application.
 */
angular
  .module('tarjetasOpacasApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          data: ['$http', function($http) {
            return $http.get('data/output.json').then(function(response) {
              return response.data;
            })
          }
          ]
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

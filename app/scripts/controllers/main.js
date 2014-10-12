'use strict';

/**
 * @ngdoc function
 * @name tarjetasOpacasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tarjetasOpacasApp
 */
angular.module('tarjetasOpacasApp')
  .controller('MainCtrl', function ($scope, data) {
    $scope.tooltip = d3.select('#tooltip');
    // data = data.people;
    console.dir(data);

    data.name = data.first_name = data.last_name = "mangantes";
    data.people.forEach(function(d) {
      d.total_amount = d3.sum(d.entries, function(p) { return p.amount; });
      d.last_name = d.name.split(', ')[0];
      d.first_name = d.name.split(', ')[1].split(' ')[0];
    });

    // var new_data = {};
    // new_data.entries = data.people;
    // new_data.name = 'Root';

    $scope.data = data;
  });

angular
  .module("ZombieEnd")
  .controller("GameController", GameController)

function GameController($scope, $http) {
  
  $http.get("../zombies.json")
  .success(function(data, status, headers, config) {
  $scope.zombies = data;
  }).
  error(function(data, status, headers, config) {

  });

} 
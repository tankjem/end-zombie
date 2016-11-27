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

    $scope.header ='name';
    $scope.reverse = true;


    $scope.sortBy = function(header){
      $scope.reverse = ($scope.header === header) ? ! $scope.reverse : false;
      $scope.header = header;
    };
    
    $scope.shotsFired = 0

    $scope.shoot = function(){
    console.log("shots fired");
    $scope.shotsFired +=1
  }

} 
angular
  .module("ZombieEnd")
  .controller("GameController", GameController)

  function GameController($scope, $http, $state, $timeout) {

    $scope.zombies = []
    $scope.zombiesKilled = []

    $scope.getZombies = function (){
    $http.get("../zombies.json")
      .success(function(data, status, headers, config) {
      $scope.zombies = data;
      }).
      error(function(data, status, headers, config) {

      });
      $scope.zombiesKilled = []
      $scope.shotsFired = 0
      $timeout.cancel($scope.timeout);
    }

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

      var randomNumber = Math.floor(Math.random()* $scope.zombies.length)
      var zombieTarget = $scope.zombies[randomNumber]
      zombieTarget.hp -= zombieTarget.damage

      var hpLeft = 100/zombieTarget.maxHp*zombieTarget.hp
      if (hpLeft < 70 && hpLeft >= 40) {
        document.getElementById(zombieTarget.name).className="orange";
      }else if (hpLeft < 40 && hpLeft >= 1){
        document.getElementById(zombieTarget.name).className="red";
      }
      if (zombieTarget.hp <= 0) {
        zombieTarget.hp = 0
        $scope.zombiesKilled.push(zombieTarget)
        $scope.zombies.splice(randomNumber, 1)
        $scope.checkWinner();
      }
      
    }
    $scope.checkWinner = function(){
      if ($scope.zombies.length === 0 || zombieTarget.name === "MASTER ZOMBIE") {
        $state.go("winner");
        $scope.timeout = $timeout(function(){
          $state.go("home");
        }, 10000)
      }

    }




} 
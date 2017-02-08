angular.module('app').controller('Post', function ($scope, $http, $location) {
  
  var id = $location.search().id;
  
  if (id) getPost();
  
  $scope.tweet = function () {
    
    var datetime = new Date(
      $scope.date.getFullYear(),
      $scope.date.getMonth(),
      $scope.date.getDate(),
      $scope.time.getHours(),
      $scope.time.getMinutes()
    );
    
    $http.post('/api/post/tweet', {
      message: $scope.message,
      datetime: datetime
    }).then(function () {

    });
  }
  
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  
  $scope.opened = false;
  
  $scope.time = new Date();
  
  $scope.open = function(){
    $scope.opened = !$scope.opened;
  }
  
  function getPost(){
    $http.post('/api/post/' + id).then(function(post){
      $scope.message = post.data.message;
      $scope.date = post.data.datetime;
      
      var datetime = new Date(post.data.datetime);
      
      $scope.time = datetime;
    });
  }
  
});
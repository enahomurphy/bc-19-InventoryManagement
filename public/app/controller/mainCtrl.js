angular.module('my-app', ['userServices'])

.controller("mainController", function($scope, User){
    
    
   User.all().success(function(data){
     
        console.log(data);
    
        $scope.users = data; 
        

   })

})
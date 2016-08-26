angular.module('UserServices', [])

.factory('User', function($http){
    
    
    var userFactory = {};
    
    
    
    userFactory.all = function() {
        
        return $http.get('/api/users')
    }
    
    
    userFactory.get = function(id) {
        
        return $http.get('/api/users/' + id)
    }
    
    
    userFactory.post = function(userData) {
     
        return $http.post('/api/users', userData)
    }
    
    userFactory.put = function(id, userData) {
        
        return $http.put('api/users' + id, userData)
    }
    
    userFactory.delete = function(id) {
        
        return $http.delete('/api/users' + id )
    }
    
        

        
    
    return myFactory;
    
})
angular.module('AuthService', [])


/*
=============================================

Auth factory for login amd logout 
inject $q to return promises
inject $http for comminaction with server 
inject AuthToken service for manageing Token

==============================================
*/

.factory('Auth', function($q, $http, AuthToken){
    
    
    AuthFactory = {}
    
    //logs user in
    AuthFactory.login = function(email, password) {
            
        $http.post('/api/users', {
            
            email       : email,
            password    : password
            
        }).success(function(data){
            
            AuthToken.setToken(data.token)
        })
        
    }
    
    //logout user 
    AuthFactory.logout = function() {
        //unset user token
        AuthToken.setToken()
    }
    
    
    //checks if user is logged is
    //checks if there is a local storage login
    AuthFactory.isLoggedIn == function() {
        
        if(AuthToken.getToken())
            return true
        else 
            return false
    }

    
    AuthFactory.getUser = function() {
        
        if(AuthToken.getToken())
            return $http.get('api/me')
        else
            return $q.reject({ message : "User has no token"})
    }
    
    return AuthFactory 
    
})

/*
=============================================

Manage Aurh token
inject $windiw  to save token

==============================================
*/


.factory('AuthToken', function($window){
    
    AuthTokenFactory = {}
    
    //function to get Token
    AuthTokenFactory.getToken =function() {
        
        return $window.localStorage.getItem('token')
    }
    
    
    //function to set and remove token
    //if token passed set token
    //if token not passed remove token
    AuthTokenFactory.setToken = function(token) {
        if(token) 
            $window.localStorage.setItem('token', token)
        else 
            $window.localStorage.removeItem('token')
        
    }
    
    return AuthTokenFactory
    
})



// =========================================================
// application configuration to integrate token into requests
// ==========================================================

.factory('AuthInterceptor', function($q, $location,  AuthToken){
    
    var AuthInterceptorFactory  = {}
    
    
    // adds the token to the header request
    // adds token to x-access-token
    AuthInterceptorFactory.request = function (config) {
        
        var token = AuthToken.getToken()
        //adds token if token exists
        if(token){
            config.headers['x-access-token'] = token
            return config
        }
    }
    
    
    // triggers if there is an error
    AuthInterceptorFactory.respponseSrror = Function (response) {
        
        //if server retuns 403 fobbidden
        if(response.status === 403 ){
            AuthToken.setToken()
            $location.path('/login')
            
            //returns the error from the server as promise
            return $q.reject(response)
        }
    }
    
    
    return AuthInterceptorFactory
    
})








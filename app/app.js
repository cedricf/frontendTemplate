angular.module('app', ['satellizer', 'ui.bootstrap', 'ui.router'])
    .config(function($authProvider, $stateProvider, $urlRouterProvider){
  
        $authProvider.twitter({
            url: '/api/user/login'
        });
  
        $urlRouterProvider.otherwise('/');
  
        $stateProvider.state('posts', {
          url: '/',
          templateUrl: 'myposts.html',
          controller: 'MyPosts'
        }).state('post', {
          url: '/post',
          templateUrl: 'post.html',
          controller: 'Post'
        });
  
    });

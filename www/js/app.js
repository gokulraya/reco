// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var app = angular.module('starter', ['ionic'])

app.controller('recoCtrl', function($http, $scope){


$scope.getMovie = function(response) {
    $scope.movies = [];
    var URL = 'http://www.tastekid.com/api/similar?k=127932-GoodRead-6VL3Z7F0&q= '+ $scope.val;
    
    $http.get(URL).success(function(response){
      for(i=0;i<response.Similar.Results.length;i++) {
        $scope.movies.push(response.Similar.Results[i])
      }
   })
}
})

app.controller('listCtrl', function($http, $scope, $rootScope) {

 
 $scope.titleName = function(title) {
  $rootScope.details = {};
  $rootScope.details['title'] = '';
  $rootScope.details['year'] = '';
  $rootScope.details['actors'] = '';
  $rootScope.details['plot'] = '';
$rootScope.details['poster'] = '';
$rootScope.details['rating'] = '';

  var details = 'http://www.omdbapi.com/?plot=short&t='+title;
  $http.get(details).success(function(response) {

 
$rootScope.details['title'] = response.Title;
$rootScope.details['year'] = response.Year;
  $rootScope.details['actors'] = response.Actors;
  $rootScope.details['plot'] = response.Plot;
$rootScope.details['poster'] = response.Poster;
$rootScope.details['rating'] = response.imdbRating;
  
  })
    
alert($rootScope.details.title);  
 }
})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
  });
 
 $stateProvider.state('details', {
    url: '/details',
    templateUrl: 'templates/details.html'
  });

  $urlRouterProvider.otherwise('/list');

});



app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

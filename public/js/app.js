angular.module('BlogApp', ['ngRoute', 'BlogApp.controllers']).config(function($interpolateProvider){
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');  // change Angular template tags so it can work with Handlebars
});
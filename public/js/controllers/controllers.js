(function() {
  angular.module('BlogApp.controllers', [])
    .controller('mainController', function($scope, $http, $window, $route, $cookieStore) {
      $scope.loggedIn = false;                  // determine if user is logged in
      $scope.post = $cookieStore.get('post');   // get state from cookie in case User refreshes on the individual Post page
      $scope.name = '';
      $scope.user = '';

      // determine if a User is logged in
      $http.get('/api/userData').success(function(user) {
        if (user._id !== undefined) {
          $scope.loggedIn = true;
          $scope.user = user;
        }
      }).error(function(data) {
        console.log('IsLogged User Error: ' + data);
      });

      $scope.isAuthor = function(name) {
        if ($scope.user) {
          return ($scope.user.facebook.name === name);
        }
        return false;
      };

      // get all posts
      $scope.getPosts = function() {
        $http.get('/api/posts').success(function(data) {
          $scope.posts = data;
        }).error(function(data) {
            console.log('Get All Posts Error: ' + data);
          });
        };

      // get single post
      $scope.getPost = function(id) {
        $http.get('/api/posts/' + id.toString()).success(function(data) {
          $cookieStore.put('post', data);   // save the state of the Post in case user refreshes on individual Post page
          $scope.post = data;
        }).error(function(data) {
          console.log('Get Single Post Error: ' + data);
        });
      };

      // create new post
      $scope.createPost = function() {
        if (!$scope.loggedIn) {
          //$scope.loggingIn = true;
          $scope.showLogin('You\'ll need to be logged in to do that');
          return;
        }

        $http.post('/api/posts/new', { user: $scope.user.facebook.name }).success(function(data) {
          $window.location.href = '/';
        }).error(function(data) {
          console.log('Create Post Error: ' + data);
        });
      };

      // update post
      $scope.updatePost = function(id) {
        $http.post('/api/posts/' + id, $scope.post).success(function(data) {
          $scope.post = data;
          $scope.getPost(id);
          $route.reload();
        }).error(function(data) {
          console.log('Update Post Error: ' + data);
        });
      };

      // delete post
      $scope.deletePost = function(id) {
        $http.delete('/api/posts/' + id).success(function(data) {
          $scope.posts = data;
        }).error(function(data) {
          console.log('Delete Post Error: ' + data);
        });
      };

      // update vote count
      $scope.updateVote = function(index, id, vote) {
        //$scope.voteUpOn[index] = !$scope.voteUpOn[index];
        if (!$scope.loggedIn) {
          $scope.showLogin('You\'ll need to be logged in to do that');
          return;
        }

        $http.post('/api/vote/' + id, { vote: parseInt(vote, 10) }).success(function(data) {
          $scope.posts[index].voteCount = data;
        }).error(function(data) {
          console.log('Update Post Vote Error: ' + data);
        });
      };

      $scope.showLogin = function (message) {
        $scope.loggingIn = true;
        $scope.message = message;
      };
    });
})();
(function() {
	angular.module('BlogApp.controllers', [])

		.controller('mainController', function($scope, $http, $window, $route) {
			// determine if user is logged in
			$scope.loggedIn = false;
			$http.get('/api/userData').success(function(user) {
					if (user._id !== undefined)
						$scope.loggedIn = true;
				}).error(function(data) {
					console.log('IsLogged User Error: ' + data);
				});


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
					$scope.id = data._id;
					$scope.post = data;
				}).error(function(data) {
					console.log('Get Single Post Error: ' + data);
				});
			};

			// create new post
			$scope.createPost = function() {
				$http.post('/api/posts/new').success(function(data) {
					$window.location.href = '/';
				}).error(function(data) {
					console.log('Create Post Error: ' + data);
				});
			};

			// update post
			$scope.updatePost = function(id) {
				$http.post('/api/posts/' + id, $scope.formData).success(function(data) {
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
					console.log('YOU MUST BE LOGGED IN TO DO THAT');
					return;
				}

				$http.post('/api/vote/' + id, { vote: parseInt(vote, 10) }).success(function(data) {
					$scope.posts[index].voteCount = data;
				}).error(function(data) {
					console.log('Update Post Vote Error: ' + data);
				});
			};

    $scope.showLogin = function () {
        $scope.loggingIn = true;
    };

    $scope.logout = function () {
        // do your logout logic
        $scope.user = null;
        $scope.loggedIn = false;
    };

    $scope.login = function () {
        // do your login logic
        $scope.loggingIn = false;
        $scope.loggedIn = true;
    };

	})
	.directive('igLogin', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div>' +
'  <div class="modal fade" id="loginModal" tabindex="-1" + role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true" > ' +
'    <div class = "modal-dialog" > ' +
'      <form name = "form" ng - submit = "submit()" > ' +
'        <div class = "modal-content" > ' +
'          <div class = "modal-header" > ' +
'            <button type="button" class = "close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()" > Cancel </button>' +
'              <h3> </h3 > ' +
'          </div>' +
'          <div class="modal-body">' +
'            <table border="0"><tr><td>Email: </td><td><input type="email" ng-model="email"></input > </td></tr> ' +
'            <tr><td>Password: </td><td><input type = "password" ng-model = "pwd" > </input></td></tr>' +
'            <tr><td colspan="2"><input type="submit" class="btn btn-primary" id="submit" ng-click="submit()" value="Login"></input ></td></tr></table> ' +
'          </div>' +
'        </div > ' +
'      </form>' +
'    </div > ' +
'  </div>' +
'</div > ',
      controller: function ($scope) {
        $scope.submit = function() {
          $scope.login();
          $("#loginModal").modal('hide');
        };
        
        $scope.cancel = function() {
          $scope.loggingIn = false;
          $("#loginModal").modal('hide');
        };
        
        $scope.$watch('loggingIn', function() {
          if ($scope.loggingIn) {
            $("#loginModal").modal('show');
          }
        });
      }
    };
  });

})();

<!--
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog"> 
    <form name="form" ng-submit="submit()"> 
      <div class="modal-content"> 
        <div class="modal-header"> 
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">Cancel</button>
            <h3> </h3> 
        </div>
        <div class="modal-body">
          <table border="0">
          	<tr>
          		<td>Email: </td>
          		<td><input type="email" ng-model="email"></input> </td>
          	</tr> 
          	<tr>
          		<td>Password: </td>
          		<td><input type="password" ng-model="pwd"> </input></td>
          	</tr>
          	<tr>
          		<td colspan="2"><input type="submit" class="btn btn-primary" id="submit" ng-click="submit()" value="Login"></input></td>
          	</tr>
          </table> 
        </div>
      </div> 
    </form>
  </div> 
</div>
-->
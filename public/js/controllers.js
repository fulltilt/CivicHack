(function() {
	angular.module('BlogApp.controllers', [])

		.controller('mainController', function($scope, $http, $window, $route) {
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
				$http.post('/api/vote/' + id, { vote: parseInt(vote, 10) }).success(function(data) {
					$scope.posts[index].voteCount = data;
				}).error(function(data) {
					console.log('Update Post Vote Error: ' + data);
				});
			};
		});

})();
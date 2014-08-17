(function() {
	angular.module('BlogApp.controllers', [])

		.controller('mainController', function($scope, $http, $window, $route) {
			$scope.formData = {};
			$scope.voteUpOn = [];
			$scope.voteDownOn = [];
/*
			// get all posts
			$http.get('/api/posts').success(function(data) {
				$scope.posts = data;
			}).error(function(data) {
				console.log('Get All Posts Error: ' + data);
			});

			// get single post
			$scope.getPost = function(id) {
				$http.get('/api/posts/' + id.toString()).success(function(data) {
					$scope.formData.title = data.title;
					$scope.formData.entry = data.entry;
					$scope.id = data._id;
					$scope.post = data;
				}).error(function(data) {
					console.log('Get Single Post Error: ' + data);
				});
			};

			// create new post
			$scope.createPost = function() {
				$scope.formData = {};
				$http.post('/api/posts/new').success(function(data) {
					console.log('createPost...');
					console.log(data);
					$window.location.href = '/';
				}).error(function(data) {
					console.log('Create Post Error: ' + data);
				});
			};

			// update post
			$scope.updatePost = function(id) {
				console.log('controller update');
				$http.post('/api/posts/' + id, $scope.formData).success(function(data) {
					$scope.post = data;
					console.log('in Controller / updatePost...');
					//$window.location.href = '/api/posts/' + id;
					//$window.location.href = '/';
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
					console.log(data);
				}).error(function(data) {
					console.log('Delete Post Error: ' + data);
				});
			};

			$scope.voteUpClick = function(index, id) {
				$scope.voteUpOn[index] = !$scope.voteUpOn[index];
				var updatedVoteCount = $scope.posts[index].voteCount;
				
				if ($scope.voteUpOn[index]) {
					updatedVoteCount = updatedVoteCount + 1;
				} else {
					updatedVoteCount = updatedVoteCount - 1;
				}

				$http.post('/api/votes/' + id, { voteCount: updatedVoteCount }).success(function(data) {
					console.log('here');
				}).error(function(data) {
					console.log('Update Vote Error: ' + data);
				});
*/
$http.get('/api/vote')
		.success(function(data) {
			$scope.count = data;
			console.log('data1:' + $scope.count);

		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

$scope.updateVote = function(vote) {
	$http.post('/api/vote/', { vote: parseInt(vote, 10) }).success(function(data) {
		$scope.count = data;
	}).error(function(data) {
		console.log('Update Vote Error: ' + data);
	});
	//$scope.count = parseInt($scope.count, 10) + parseInt(vote, 10);
};

/*
$http({
    method: 'POST',
    url: '/api/votes/' + id,
    data: { voteCount: 1 },
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
.then(function(response) {
        console.log('success');
    },
    function(response) { // optional
        console.log('failed');
    }
);
http://stackoverflow.com/questions/19254029/angularjs-http-post-does-not-send-data

				$scope.voteDownOn[index] = false;
			};

			$scope.voteDownClick = function(index) {
				$scope.voteDownOn[index] = !$scope.voteDownOn[index];
				$scope.voteUpOn[index] = false;
			};
			*/
		});

})();
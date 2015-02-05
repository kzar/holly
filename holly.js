function hollyCtrl($scope, $http, $timeout) {
    function load_next_page() {
        $scope.i = 0;
        $scope.loading = true;
        $http.jsonp("http://www.reddit.com/r/aww/.json?jsonp=JSON_CALLBACK&after=" + $scope.after).
            success(function(data, status, headers, config) {
                var i, url;
                $scope.posts = [];
                for (i = 0; i < data.data.children.length; i += 1) {
                    url = data.data.children[i].data.url;
                    if (!url.match(/^http:\/\/i.imgur.com\/.+\.[a-zA-Z]+$/)) {
                        continue;
                    }
                    $scope.posts.push(url);
                }
                $scope.after = data.data.children[data.data.children.length -1].data.name;
                $scope.loading = false;
            });
    }

    $scope.after = "";
    load_next_page();

    $timeout(function nextImage(){
        if (!$scope.loading) {
            if ($scope.i >= $scope.posts.length) {
                load_next_page();
            }
            $scope.i += 1;
            $timeout(nextImage, 33000);
        }
    }, 3000);
}
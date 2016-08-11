var chatApp = angular.module('chatApp', []);

chatApp.controller('ChatController',['$http', '$log', '$scope', function($http, $log, $scope) {
    $scope.id = '-id';
    $scope.reverse = false;
    $scope.baseUrl = 'http://localhost:3001';
    $scope.chatList = [];
    
    $scope.getAllChat = function () {
        io.socket.get('/chat/addconv');
        $http.get($scope.baseUrl + '/chat').success(function(data) {
           $scope.chatList = data;
           $log.info(data); 
        });
    };
    
    $scope.getAllChat();
    $scope.user = '';
    $scope.message='';
    
    io.socket.on('chat', function(obj) {
        if(obj.verb === 'created') {
            $log.info(obj);
            $scope.chatList.push(obj.data);
            $scope.$digest();
        }
    });

    $scope.sendMessage = function() {
        console.log($scope.message);
        $log.info($scope.message);
        io.socket.post('/chat/addconv/', {user: $scope.user, message: $scope.message});
        $scope.message = "";
    };
}]);

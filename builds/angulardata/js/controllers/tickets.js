myApp.controller('ticketsController',
  ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();

    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var ticketsRef = ref.child('users').child(authUser.uid).child('tickets');
        var ticketsInfo = $firebaseArray(ticketsRef);

        $scope.tickets = ticketsInfo;

        ticketsInfo.$loaded().then(function(data) {
          $rootScope.howManytickets = ticketsInfo.length;
        }); // make sure ticket data is loaded

        ticketsInfo.$watch(function(data) {
          $rootScope.howManytickets = ticketsInfo.length;
        });

        $scope.addticket = function() {
          ticketsInfo.$add({
            name: $scope.ticketname,
            date: firebase.database.ServerValue.TIMESTAMP
          }).then(function() {
            $scope.ticketname='';
          }); //promise
        } //addticket

        $scope.deleteticket = function(key) {
          ticketsInfo.$remove(key);
        } //deleteticket

      } //authUser
    }); //onAuthStateChanged
}]); //myApp.controller
